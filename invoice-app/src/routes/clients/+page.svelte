<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { clientStore } from "$lib/clientStore.svelte.js";
  import { theme } from "$lib/theme.svelte.js";

  // =====================================================
  // MENU SIDEBAR (halaman ini, bukan section-scroll seperti /editor)
  // =====================================================

  const menuItems = [
    { label: "Buat Invoice", icon: "▣", href: "/editor" },
    { label: "Template", icon: "▤", href: "/templates" },
    { label: "Klien", icon: "♙", href: "/clients" },
    { label: "Produk", icon: "▱", href: "/products" },
  ];

  let sidebarOpen = $state(false);

  // =====================================================
  // STATE
  // =====================================================

  let clients = $state([]);
  let loading = $state(true);
  let saving = $state(false);
  let message = $state("");

  let editingId = $state(null);

  let form = $state({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  function resetForm() {
    editingId = null;

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

    window.scrollTo({ top: 0, behavior: "smooth" });
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
    onClose={() => (sidebarOpen = false)}
    {menuItems}
    menuLabel="Menu"
  />

  <main
    class="min-h-screen transition-all duration-300 {sidebarOpen
      ? 'ml-64'
      : 'ml-0'}"
  >
    <!-- NAVBAR -->

    <nav
      class="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-black px-4 py-4 flex justify-between items-center"
    >
      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick={() => (sidebarOpen = !sidebarOpen)}
          aria-label="Toggle sidebar"
          class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="2" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="8" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="14" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>

        <a href="/" class="flex items-center gap-2 font-bold text-lg">
          <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
          InvoiceKita
        </a>
      </div>

      <div class="flex gap-4 items-center text-sm">
        <a href="/editor" class="opacity-70 hover:opacity-100 transition">
          Buat Invoice
        </a>

        <button
          onclick={() => theme.toggle()}
          class="text-lg"
          aria-label="Toggle dark mode"
        >
          {theme.dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>

    <!-- CONTENT -->

    <div class="py-8 px-4 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6">Kelola Klien</h1>

      <!-- FORM -->

      <div
        class="bg-slate-50 dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 mb-6"
      >
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

      <!-- LIST -->

      {#if loading}
        <p class="text-center opacity-60">Memuat data klien...</p>
      {:else if clients.length === 0}
        <p class="text-center opacity-60">
          Belum ada klien. Tambahkan klien pertama kamu di atas.
        </p>
      {:else}
        <div class="space-y-3">
          {#each clients as client (client.id)}
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
    </div>
  </main>
</div>
