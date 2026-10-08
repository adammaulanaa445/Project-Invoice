<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/authStore.svelte.js';

  let currentUser = $state(null);

  // =====================================================
  // IKON (SVG garis tipis, bukan emoji) - satu sumber dipakai
  // di semua item menu lewat {@html icons[item.icon]}
  // =====================================================

  const icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,

    invoice: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,

    template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,

    clients: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,

    products: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,

    schedule: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,

    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,

    building: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="18"></line><line x1="15" y1="22" x2="15" y2="18"></line></svg>`,

    user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,

    list: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,

    percent: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`,

    note: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,

    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,

    close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 6-12 12"></path><path d="m6 6 12 12"></path></svg>`,
  };

  // =====================================================
  // MENU GLOBAL - satu sumber, dipakai sama persis di SEMUA
  // halaman. Jangan lagi definisikan menuItems terpisah di
  // tiap +page.svelte supaya tidak ada drift/inkonsisten.
  // =====================================================

  const globalMenuItems = [
    { label: 'Beranda', icon: 'home', href: '/' },
    { label: 'Template', icon: 'template', href: '/templates' },
    { label: 'Klien', icon: 'clients', href: '/clients' },
    { label: 'Produk', icon: 'products', href: '/products' },
    { label: 'Jadwal Kirim', icon: 'schedule', href: '/schedules' },
    { label: 'Profile', icon: 'settings', href: '/profile' },
  ];

  // props: hanya buka/tutup sidebar. Menu TIDAK lagi dioper dari
  // luar supaya konsisten di semua halaman.
  let { sidebarOpen = true, onClose = () => {} } = $props();

  $effect(() => {
    currentUser = authStore.getCurrentUser();
  });

  function isActive(item) {
    if (item.href) {
      return $page.url.pathname === item.href;
    }
    return false;
  }

  function handleItemClick(item) {
    if (item.href) {
      goto(item.href);
      return;
    }
  }

  async function handleLogout() {
    await authStore.logout();
    goto('/login');
  }

  function openProfile() {
    goto('/profile');
  }
</script>

<!--
  BACKDROP / OVERLAY GELAP
  Hanya muncul di layar mobile (lg:hidden) saat sidebar terbuka.
-->
{#if sidebarOpen}
  <button
    type="button"
    aria-label="Tutup sidebar"
    onclick={onClose}
    class="fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden"
  ></button>
{/if}

<aside
  class="
    fixed
    left-0
    top-0
    z-40
    h-screen
    w-64
    flex
    flex-col
    bg-[#111111]
    text-white
    border-r
    border-white/10
    transition-transform
    duration-300
    ease-in-out
    {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  "
>
  <!-- LOGO + CLOSE BUTTON -->
  <div class="px-6 py-6 flex items-center justify-between">
    <button type="button" onclick={() => goto('/')} class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
      <span class="text-lg font-bold">InvoiceKita</span>
    </button>

    <button
      type="button"
      onclick={onClose}
      aria-label="Tutup sidebar"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
    >
      {@html icons.close}
    </button>
  </div>

  <!-- MENU (scrollable kalau konten panjang) -->
  <nav class="sidebar-menu flex-1 min-h-0 px-3 overflow-x-hidden overflow-y-auto">
    <!-- MENU GLOBAL -->
    <p class="px-3 mb-3 text-[10px] uppercase tracking-wider text-white/40">
      Menu
    </p>

    <div class="space-y-1 mb-5">
      {#each globalMenuItems as item}
        <button
          type="button"
          onclick={() => handleItemClick(item)}
          class="
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
            transition text-left
            {isActive(item)
              ? 'font-semibold text-black'
              : 'text-white/70 hover:text-white hover:bg-white/5'}
          "
          style={isActive(item) ? 'background:#8CFF3D' : ''}
        >
          <span class="shrink-0 {isActive(item) ? 'text-black' : 'text-white/60'}">
            {@html icons[item.icon]}
          </span>
          <span>{item.label}</span>
        </button>
      {/each}
    </div>

  </nav>

  <!-- BOTTOM -->
  <div class="p-3">
    {#if currentUser}
      <!-- PROFILE -->
      <button
        type="button"
        onclick={openProfile}
        class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-left"
      >
        <span
          class="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-black font-bold"
          style="background:#8CFF3D"
        >
          {currentUser?.name?.charAt(0).toUpperCase() ?? '?'}
        </span>

        <span class="min-w-0 flex-1">
          <span class="block text-sm font-semibold truncate">
            {currentUser?.name ?? 'User'}
          </span>
          <span class="block text-xs text-white/40 truncate">
            {currentUser?.email ?? ''}
          </span>
        </span>
      </button>

      <!-- LOGOUT -->
      <button
        type="button"
        onclick={handleLogout}
        class="w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition text-left"
      >
        <span class="shrink-0">{@html icons.logout}</span>
        <span>Logout</span>
      </button>
    {:else}
      <!-- BELUM LOGIN -->
      <a
        href="/login"
        class="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
        style="background:#8CFF3D"
      >
        Masuk
      </a>

      <p class="text-center text-xs text-white/40 mt-3">
        Belum punya akun?
        <a href="/register" class="font-medium hover:underline" style="color:#8CFF3D">
          Daftar
        </a>
      </p>
    {/if}
  </div>
</aside>

<style>
  /* Scroll tetap tersedia, tetapi tampil tipis dan selaras dengan sidebar gelap. */
  .sidebar-menu {
    scrollbar-color: rgb(255 255 255 / 0.24) transparent;
    scrollbar-width: thin;
  }

  .sidebar-menu::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar-menu::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar-menu::-webkit-scrollbar-thumb {
    background: rgb(255 255 255 / 0.2);
    border-radius: 999px;
  }

  .sidebar-menu::-webkit-scrollbar-thumb:hover {
    background: rgb(255 255 255 / 0.38);
  }
</style>
