<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import AppSidebar from '$lib/components/AppSidebar.svelte';
  import { sidebar } from '$lib/sidebarStore.svelte.js';
  import { clientStore } from '$lib/clientStore.svelte.js';
  import { productStore } from '$lib/productStore.svelte.js';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import { Users, Package, Palette } from '@lucide/svelte';

  let user = $state(null);
  let sidebarOpen = $derived(sidebar.open);
  let clients = $state([]);
  let products = $state([]);
  let loading = $state(true);

  onMount(async () => {
    try {
      user = JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      user = null;
    }

    if (!localStorage.getItem('auth_token')) {
      goto('/login');
      return;
    }
    try {
      [clients, products] = await Promise.all([clientStore.getAll(), productStore.getAll()]);
    } finally {
      loading = false;
    }
  });
</script>

<div class="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white">
  <AppSidebar {sidebarOpen} onClose={() => sidebar.close()} />
  <main class="min-h-screen transition-all duration-300 {sidebarOpen ? 'lg:ml-64' : ''}">
    <AppHeader title="Dashboard" />

    <div class="max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-8">
      <div class="rounded-3xl bg-[#111] text-white p-6 sm:p-10 flex flex-col md:flex-row justify-between gap-6">
        <div><p class="text-sm text-white/60">Selamat datang kembali, {user?.name || user?.email || 'User'}</p><h2 class="text-3xl sm:text-4xl font-bold mt-2">Kelola invoice lebih mudah.</h2><p class="text-white/60 mt-3 max-w-lg">Buat invoice, simpan data klien, dan kelola produk dari satu tempat.</p></div>
        <button onclick={() => goto('/templates')} class="self-start rounded-full px-5 py-3 text-black font-semibold" style="background:#8CFF3D">+ Buat Invoice</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div class="rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 p-5"><p class="text-sm opacity-60">Total Klien</p><p class="text-3xl font-bold mt-2">{loading ? '—' : clients.length}</p><a href="/clients" class="text-sm mt-3 inline-block" style="color:#65b82b">Kelola klien →</a></div>
        <div class="rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 p-5"><p class="text-sm opacity-60">Total Produk</p><p class="text-3xl font-bold mt-2">{loading ? '—' : products.length}</p><a href="/products" class="text-sm mt-3 inline-block" style="color:#65b82b">Kelola produk →</a></div>
        <div class="rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 p-5"><p class="text-sm opacity-60">Aksi cepat</p><button onclick={() => goto('/templates')} class="mt-3 text-sm font-semibold" style="color:#65b82b">Pilih template →</button></div>
      </div>

      <section class="mt-8"><h2 class="text-xl font-bold mb-4">Aksi cepat</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><a href="/clients" class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] p-5 hover:border-lime-400 transition"><Users size={28} strokeWidth={1.8} style="color:#8CFF3D" /><h3 class="font-semibold mt-3">Tambah Klien</h3><p class="text-sm opacity-60 mt-1">Simpan informasi pelanggan baru.</p></a><a href="/products" class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] p-5 hover:border-lime-400 transition"><Package size={28} strokeWidth={1.8} style="color:#8CFF3D" /><h3 class="font-semibold mt-3">Tambah Produk</h3><p class="text-sm opacity-60 mt-1">Kelola jasa dan harga satuan.</p></a><a href="/templates" class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] p-5 hover:border-lime-400 transition"><Palette size={28} strokeWidth={1.8} style="color:#8CFF3D" /><h3 class="font-semibold mt-3">Lihat Template</h3><p class="text-sm opacity-60 mt-1">Pilih desain invoice favorit.</p></a></div></section>
    </div>
  </main>
</div>
