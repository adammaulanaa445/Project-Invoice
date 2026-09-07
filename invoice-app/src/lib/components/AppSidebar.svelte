<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/authStore.svelte.js';

  let currentUser = $state(null);

  // =========================
  // MENU BAWAAN (perilaku lama, khusus /editor)
  // Setiap item bisa berupa:
  //   { label, icon, section }            -> scroll ke id di halaman yang sama (dipakai /editor)
  //   { label, icon, href }               -> navigasi ke halaman lain
  //   tambahkan authOnly: true            -> item hanya tampil kalau user sudah login
  // =========================

  const defaultMenuItems = [
    { label: 'Informasi Invoice', icon: '▣', section: 'invoice' },
    { label: 'Perusahaan', icon: '▤', section: 'company' },
    { label: 'Pelanggan', icon: '♙', section: 'customer' },
    { label: 'Item Invoice', icon: '▱', section: 'items' },
    { label: 'Pajak & Diskon', icon: '%', section: 'tax' },
    { label: 'Catatan', icon: '▤', section: 'notes' }
  ];

  // props: bisa dioverride dari halaman yang memakai AppSidebar
  // sidebarOpen & onClose sekarang berfungsi penuh di SEMUA ukuran layar.
  // Kalau halaman tidak mengirim prop ini sama sekali, default-nya "terbuka terus"
  // (sama seperti perilaku sebelum fitur tutup ada) -> aman untuk /editor yang belum diubah.
  let {
    menuItems = defaultMenuItems,
    menuLabel = 'Invoice',
    sidebarOpen = true,
    onClose = () => {}
  } = $props();

  $effect(() => {
    currentUser = authStore.getCurrentUser();
  });

  // menu yang tampil menyesuaikan status login
  let visibleMenuItems = $derived(
    menuItems.filter((item) => !item.authOnly || currentUser)
  );

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
    if (item.section) {
      goToSection(item.section);
    }
  }

  // perilaku scroll-to-section, TIDAK diubah dari versi asli
  function goToSection(section) {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      window.history.replaceState(
        null,
        '',
        `/editor#${section}`
      );

      window.dispatchEvent(
        new CustomEvent('invoice-section', {
          detail: section
        })
      );
    } else {
      goto(`/editor#${section}`);
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
  Di desktop tidak ada backdrop -- sidebar cuma geser masuk/keluar,
  konten di sebelahnya menyesuaikan lewat class di halaman (pl-64 / tidak).
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
    <button
      type="button"
      onclick={() => goto('/')}
      class="flex items-center gap-2"
    >
      <span
        class="w-3 h-3 rounded-full"
        style="background:#8CFF3D"
      ></span>

      <span class="text-lg font-bold">
        InvoiceKita
      </span>
    </button>

    <!-- CLOSE BUTTON: aktif di semua ukuran layar sekarang -->
    <button
      type="button"
      onclick={onClose}
      aria-label="Tutup sidebar"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
    >
      ✕
    </button>
  </div>

  <!-- MENU -->
  <nav class="flex-1 px-3">
    <p
      class="px-3 mb-3 text-[10px] uppercase tracking-wider text-white/40"
    >
      {menuLabel}
    </p>

    <div class="space-y-1">
      {#each visibleMenuItems as item}
        <button
          type="button"
          onclick={() => handleItemClick(item)}
          class="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            transition
            text-left
            {isActive(item)
              ? 'font-semibold text-black'
              : 'text-white/70 hover:text-white hover:bg-white/5'}
          "
          style={isActive(item) ? 'background:#8CFF3D' : ''}
        >
          <span
            class="w-5 text-center {isActive(item) ? 'text-black' : 'text-white/60'}"
          >
            {item.icon}
          </span>

          <span>
            {item.label}
          </span>
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
        class="
          w-full
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-white/5
          transition
          text-left
        "
      >
        <span
          class="
            w-9
            h-9
            shrink-0
            rounded-full
            flex
            items-center
            justify-center
            text-black
            font-bold
          "
          style="background:#8CFF3D"
        >
          {currentUser?.name?.charAt(0).toUpperCase() ?? '?'}
        </span>

        <span class="min-w-0 flex-1">
          <span
            class="block text-sm font-semibold truncate"
          >
            {currentUser?.name ?? 'User'}
          </span>

          <span
            class="block text-xs text-white/40 truncate"
          >
            {currentUser?.email ?? ''}
          </span>
        </span>

        <span class="text-white/40">
          ⋮
        </span>
      </button>

      <!-- LOGOUT -->
      <button
        type="button"
        onclick={handleLogout}
        class="
          w-full
          flex
          items-center
          gap-3
          px-3
          py-2.5
          mt-2
          rounded-lg
          text-sm
          text-red-400
          hover:bg-red-500/10
          transition
          text-left
        "
      >
        <span class="w-5 text-center">
          ↪
        </span>

        <span>
          Logout
        </span>
      </button>

    {:else}

      <!-- BELUM LOGIN -->
      <a
        href="/login"
        class="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          py-2.5
          text-sm
          font-semibold
          text-black
          transition
          hover:opacity-90
        "
        style="background:#8CFF3D"
      >
        Masuk
      </a>

      <p class="text-center text-xs text-white/40 mt-3">
        Belum punya akun?
        <a
          href="/register"
          class="font-medium hover:underline"
          style="color:#8CFF3D"
        >
          Daftar
        </a>
      </p>

    {/if}

  </div>
</aside>