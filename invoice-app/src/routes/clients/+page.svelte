<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { clientStore } from "$lib/clientStore.svelte.js";
  import { sidebar } from "$lib/sidebarStore.svelte.js";
  import AppHeader from "$lib/components/AppHeader.svelte";

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

  let clients = $state([]);
  let search = $state("");
  let loading = $state(true);

  let filteredClients = $derived(
    clients.filter((client) =>
      [client.name, client.email, client.phone, client.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );
  let saving = $state(false);
  let message = $state("");

  let editingId = $state(null);
  let showFormModal = $state(false);

  let form = $state({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  function resetForm() {
    editingId = null;
    showFormModal = false;

    form = {
      name: "",
      address: "",
      email: "",
      phone: "",
    };
  }

  // =====================================================
  // LOAD DATA
  // =====================================================

  async function loadClients() {
    loading = true;

    try {
      clients = await clientStore.getAll();
    } catch (error) {
      console.error("Load clients error:", error);
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

    await loadClients();
  });

  // =====================================================
  // SUBMIT (TAMBAH / EDIT)
  // =====================================================

  async function handleSubmit() {
    if (!form.name.trim()) {
      message = "❌ Nama klien wajib diisi.";

      setTimeout(() => {
        message = "";
      }, 4000);

      return;
    }

    saving = true;
    message = "";

    try {
      if (editingId) {
        await clientStore.update(editingId, form);

        message = "✅ Klien berhasil diperbarui!";
      } else {
        await clientStore.create(form);

        message = "✅ Klien berhasil ditambahkan!";
      }

      resetForm();

      await loadClients();
    } catch (error) {
      console.error("Save client error:", error);

      message = "❌ " + (error.message || "Terjadi kesalahan.");
    } finally {
      saving = false;

      setTimeout(() => {
        message = "";
      }, 4000);
    }
  }

  // =====================================================
  // EDIT & HAPUS
  // =====================================================

  function editClient(client) {
    editingId = client.id;

    form = {
      name: client.name || "",
      address: client.address || "",
      email: client.email || "",
      phone: client.phone || "",
    };

    showFormModal = true;
  }

  async function deleteClient(id) {
    if (!confirm("Yakin ingin menghapus klien ini?")) return;

    try {
      await clientStore.remove(id);

      await loadClients();
    } catch (error) {
      alert(error.message || "Gagal menghapus klien.");
    }
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
    <AppHeader title="Kelola Klien" />

    <!-- CONTENT -->

    <div class="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_180px] gap-6 items-start">
      <aside class="hidden lg:block space-y-4 pt-16">
        <div class="rounded-2xl bg-lime-50 dark:bg-lime-400/10 p-4 border border-lime-200 dark:border-lime-400/20"><span class="text-2xl">♙</span><p class="font-semibold mt-2">Klien aktif</p><p class="text-3xl font-bold mt-1">{clients.length}</p></div>
        <div class="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 text-sm opacity-70">Simpan data klien agar invoice bisa dibuat lebih cepat.</div>
      </aside>

      <section>
      <h1 class="text-2xl font-bold text-center mb-6">Kelola Klien</h1>

      <!-- FORM -->

      <div class="flex flex-col sm:flex-row gap-3 mb-4">
        <input bind:value={search} placeholder="Cari klien..." class="flex-1 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-full px-4 py-2 text-sm" />
        <button onclick={() => { resetForm(); showFormModal = true; }} class="px-4 py-2 rounded-full font-semibold text-black whitespace-nowrap" style="background:#8CFF3D">+ Tambah Klien</button>
      </div>

      {#if showFormModal}
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onclick={(event) => event.target === event.currentTarget && resetForm()}>
      <div id="client-form"
        class="w-full max-w-lg bg-white dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-2xl">
        <h2 class="font-semibold mb-3">
          {editingId ? "Edit Klien" : "Tambah Klien Baru"}
        </h2>

        <div class="space-y-2">
          <input
            placeholder="Nama klien"
            bind:value={form.name}
            class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
          />

          <input
            placeholder="Alamat"
            bind:value={form.address}
            class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
          />

          <div class="grid grid-cols-2 gap-2">
            <input
              type="email"
              placeholder="Email"
              bind:value={form.email}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

            <input
              placeholder="Telepon"
              bind:value={form.phone}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <button
            onclick={handleSubmit}
            disabled={saving}
            class="flex-1 text-black px-4 py-2 rounded-full font-semibold disabled:opacity-50"
            style="background:#8CFF3D"
          >
            {saving
              ? "Menyimpan..."
              : editingId
                ? "Simpan Perubahan"
                : "Tambah Klien"}
          </button>

          {#if editingId}
            <button
              onclick={resetForm}
              class="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20"
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
        <p class="text-center opacity-60">Memuat data klien...</p>
      {:else if clients.length === 0}
        <p class="text-center opacity-60">
          Belum ada klien. Tambahkan klien pertama kamu di atas.
        </p>
      {:else}
        <div class="space-y-3">
          {#each filteredClients as client (client.id)}
            <div
              class="bg-slate-50 dark:bg-[#111] rounded-xl border border-slate-200 dark:border-white/10 p-4 flex justify-between items-start gap-4"
            >
              <div class="min-w-0">
                <p class="font-semibold truncate">{client.name}</p>

                {#if client.address}
                  <p class="text-sm opacity-60 truncate">{client.address}</p>
                {/if}

                <p class="text-sm opacity-60 truncate">
                  {client.email || ""}{client.email && client.phone
                    ? " • "
                    : ""}{client.phone || ""}
                </p>
              </div>

              <div class="flex gap-2 shrink-0">
                <button
                  onclick={() => editClient(client)}
                  class="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Edit
                </button>

                <button
                  onclick={() => deleteClient(client.id)}
                  class="text-xs px-3 py-1.5 rounded-full border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Hapus
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
      </section>

      <aside class="hidden lg:block space-y-4 pt-16">
        <div class="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10"><span class="text-2xl">⌕</span><p class="font-semibold mt-2">Cari cepat</p><p class="text-sm opacity-60 mt-1">Gunakan kolom pencarian untuk menemukan klien.</p></div>
        <div class="rounded-2xl bg-black dark:bg-white text-white dark:text-black p-4 text-sm">Tip: data lengkap membuat invoice lebih rapi.</div>
      </aside>
    </div>
  </main>
</div>
