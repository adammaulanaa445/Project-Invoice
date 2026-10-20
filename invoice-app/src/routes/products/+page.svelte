<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { productStore } from "$lib/productStore.svelte.js";
  import { sidebar } from "$lib/sidebarStore.svelte.js";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { notify } from "$lib/alerts.js";
  import { Package, Pencil, Plus, Search, Trash2 } from "@lucide/svelte";

  function errorMessage(error, fallback) {
    return error?.message || fallback;
  }

  function validateProduct() {
    if (form.name.trim()) return true;
    notify.warning("Nama produk belum diisi", "Isi nama produk atau jasa sebelum menyimpan.");
    return false;
  }

  function showFailure(error, fallback) {
    return notify.error("Proses gagal", errorMessage(error, fallback));
  }

  function confirmDelete() {
    return notify.confirm("Hapus produk?", "Data produk yang dihapus tidak dapat dikembalikan.", "Ya, hapus");
  }

  // =====================================================
  // MENU SIDEBAR (halaman ini, bukan section-scroll seperti /editor)
  // =====================================================

  const menuItems = [
    { label: "Buat Invoice", icon: "▣", href: "/editor" },
    { label: "Template", icon: "▤", href: "/templates" },
    { label: "Klien", icon: "♙", href: "/clients" },
    { label: "Produk", icon: "▱", href: "/products" },
  ];

  let sidebarOpen = $derived(sidebar.open);

  // =====================================================
  // STATE
  // =====================================================

  let products = $state([]);
  let search = $state("");
  let loading = $state(true);

  const PAGE_SIZE = 10;
  let currentPage = $state(1);
  let filteredProducts = $derived(
    products.filter((product) =>
      [product.name, product.description]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );
  let totalPages = $derived(Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE)));
  let paginatedProducts = $derived(filteredProducts.slice((Math.min(currentPage, totalPages) - 1) * PAGE_SIZE, Math.min(currentPage, totalPages) * PAGE_SIZE));
  let saving = $state(false);

  let editingId = $state(null);
  let showFormModal = $state(false);

  let form = $state({
    name: "",
    description: "",
    price: 0,
  });

  let message = $state("");

  function resetForm() {
    editingId = null;
    showFormModal = false;

    form = {
      name: "",
      description: "",
      price: 0,
    };
  }

  // =====================================================
  // LOAD DATA
  // =====================================================

  async function loadProducts() {
    loading = true;

    try {
      products = await productStore.getAll();
    } catch (error) {
      console.error("Load products error:", error);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      goto("/login");
      return;
    }

    await loadProducts();
  });

  // =====================================================
  // SUBMIT (TAMBAH / EDIT)
  // =====================================================

  async function handleSubmit() {
    if (!validateProduct()) return;

    saving = true;
    const isEditing = Boolean(editingId);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price) || 0,
      };

      if (isEditing) {
        await productStore.update(editingId, payload);
      } else {
        await productStore.create(payload);
      }

      resetForm();
      await loadProducts();
      await notify.success(
        isEditing ? "Produk diperbarui" : "Produk ditambahkan",
        isEditing ? "Perubahan produk sudah tersimpan." : "Produk baru sudah tersimpan.",
      );
    } catch (error) {
      console.error("Save product error:", error);
      await showFailure(error, "Gagal menyimpan produk.");
    } finally {
      saving = false;
    }
  }

  // =====================================================
  // EDIT & HAPUS
  // =====================================================

  function editProduct(product) {
    editingId = product.id;

    form = {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
    };

    showFormModal = true;
  }

  async function deleteProduct(id) {
    if (!(await confirmDelete())) return;

    try {
      await productStore.remove(id);
      await loadProducts();
      await notify.success("Produk dihapus", "Data produk sudah dihapus.");
    } catch (error) {
      await showFailure(error, "Gagal menghapus produk.");
    }
  }

  function formatRupiah(value) {
    return "Rp" + Number(value || 0).toLocaleString("id-ID");
  }
</script>

<div
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors"
>
  <AppSidebar
    {sidebarOpen}
    onClose={() => sidebar.close()}
    {menuItems}
    menuLabel="Menu"
  />

  <main
    class="min-h-screen transition-all duration-300 {sidebarOpen
      ? 'ml-64'
      : 'ml-0'}"
  >
    <AppHeader title="Kelola Produk" />

    <!-- CONTENT -->

    <div class="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_180px] gap-6 items-start">
      <aside class="hidden lg:block space-y-4 pt-16">
        <div class="rounded-2xl bg-lime-50 dark:bg-lime-400/10 p-4 border border-lime-200 dark:border-lime-400/20"><span class="text-2xl">▱</span><p class="font-semibold mt-2">Produk aktif</p><p class="text-3xl font-bold mt-1">{products.length}</p></div>
        <div class="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 text-sm opacity-70">Kelola jasa dan harga dari satu tempat.</div>
      </aside>

      <section>
      <h1 class="text-2xl font-bold text-center mb-6">Kelola Produk</h1>

      <!-- FORM -->

      <div class="relative z-10 flex flex-col sm:flex-row gap-3 mb-4">
        <label class="relative flex-1">
          <Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" aria-hidden="true" />
          <input value={search} oninput={(event) => { search = event.currentTarget.value; currentPage = 1; }} placeholder="Cari produk..." class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-full py-2 pl-11 pr-4 text-sm" />
        </label>
        <button type="button" onclick={() => { resetForm(); showFormModal = true; }} class="relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-black whitespace-nowrap cursor-pointer" style="background:#8CFF3D"><Plus size={18} aria-hidden="true" />Tambah Produk</button>
      </div>

      {#if showFormModal}
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onclick={(event) => event.target === event.currentTarget && resetForm()}>
      <div id="product-form"
        class="w-full max-w-lg bg-white dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-2xl">
        <h2 class="font-semibold mb-3">
          {editingId ? "Edit Produk" : "Tambah Produk Baru"}
        </h2>

        <div class="space-y-2">
          <input
            placeholder="Nama produk / jasa"
            bind:value={form.name}
            class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
          />

          <input
            placeholder="Deskripsi (opsional)"
            bind:value={form.description}
            class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
          />

          <div>
            <label class="text-xs opacity-60">Harga satuan (Rp)</label>

            <input
              type="number"
              min="0"
              bind:value={form.price}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
            />
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <button
            type="button"
            onclick={handleSubmit}
            disabled={saving}
            class="flex-1 text-black px-4 py-2 rounded-full font-semibold disabled:opacity-50 cursor-pointer"
            style="background:#8CFF3D"
          >
            {saving
              ? "Menyimpan..."
              : editingId
                ? "Simpan Perubahan"
                : "Tambah Produk"}
          </button>

          {#if editingId}
            <button
              type="button"
              onclick={resetForm}
              class="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 cursor-pointer"
            >
              Batal
            </button>
          {:else}
            <button
              type="button"
              onclick={resetForm}
              class="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 cursor-pointer"
            >
              Batal
            </button>
          {/if}
        </div>

        {#if message}
          <p
            class="text-center text-sm mt-3 {message.startsWith('✅')
              ? 'text-emerald-500'
              : 'text-red-500'}"
          >
            {message}
          </p>
        {/if}
      </div>
      </div>
      {/if}

      <!-- LIST -->

      {#if loading}
        <p class="text-center opacity-60">Memuat data produk...</p>
      {:else if products.length === 0}
        <p class="text-center opacity-60">
          Belum ada produk. Tambahkan produk pertama kamu di atas.
        </p>
      {:else}
        <div class="space-y-3">
          {#each paginatedProducts as product (product.id)}
            <div
              class="bg-slate-50 dark:bg-[#111] rounded-xl border border-slate-200 dark:border-white/10 p-4 flex justify-between items-start gap-4"
            >
              <div class="min-w-0">
                <p class="font-semibold truncate">{product.name}</p>

                {#if product.description}
                  <p class="text-sm opacity-60 truncate">
                    {product.description}
                  </p>
                {/if}

                <p class="text-sm mt-1" style="color:#8CFF3D">
                  {formatRupiah(product.price)}
                </p>
              </div>

              <div class="flex gap-2 shrink-0">
                <button
                  onclick={() => editProduct(product)}
                  class="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Edit
                </button>

                <button
                  onclick={() => deleteProduct(product.id)}
                  class="text-xs px-3 py-1.5 rounded-full border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Hapus
                </button>
              </div>
            </div>
          {/each}
        </div>
        {#if totalPages > 1}
          <nav class="mt-5 flex items-center justify-between gap-3 text-sm" aria-label="Pagination produk">
            <span class="opacity-60">{filteredProducts.length} produk · Halaman {Math.min(currentPage, totalPages)} dari {totalPages}</span>
            <div class="flex gap-2"><button type="button" onclick={() => (currentPage = Math.max(1, currentPage - 1))} disabled={currentPage <= 1} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Sebelumnya</button><button type="button" onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Berikutnya</button></div>
          </nav>
        {/if}
      {/if}
      </section>

      <aside class="hidden lg:block space-y-4 pt-16">
        <div class="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10"><span class="text-2xl">⌕</span><p class="font-semibold mt-2">Cari cepat</p><p class="text-sm opacity-60 mt-1">Temukan produk berdasarkan nama atau deskripsi.</p></div>
        <div class="rounded-2xl bg-black dark:bg-white text-white dark:text-black p-4 text-sm">Tip: harga tersimpan otomatis dalam data produk.</div>
      </aside>
    </div>
  </main>
</div>
