<script>
  import { goto } from "$app/navigation";
  import { theme } from "$lib/theme.svelte.js";
  import { lang } from "$lib/lang.svelte.js";
  import { authStore } from "$lib/authStore.svelte.js";
  import TemplatePreview from "$lib/components/TemplatePreview.svelte";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { onMount } from "svelte";

  import InvoiceBoldTypography from "$lib/components/invoices/InvoiceBoldTypography.svelte";
  import Invoice01Neat from "$lib/components/invoices/Invoice01Neat.svelte";
  import Invoice05DarkStudio from "$lib/components/invoices/Invoice05DarkStudio.svelte";

  const stats = [
    { value: "42+", label: "Template" },
    { value: "10", label: "Bahasa" },
    { value: "100%", label: "Gratis" },
    { value: "24/7", label: "Akses" },
  ];

  const services = [
    { titleKey: "f1_title", descKey: "f1_desc" },
    { titleKey: "f2_title", descKey: "f2_desc" },
    { titleKey: "f3_title", descKey: "f3_desc" },
    { titleKey: "Cetak Via PDF", descKey: "Cetak Via PDF" },
  ];

  // =========================
  // MENU UNTUK AppSidebar
  // item dengan authOnly hanya tampil kalau user sudah login
  // =========================

  const menuItems = [
    { label: "Beranda", icon: "🏠", href: "/" },
    { label: "Template", icon: "🎨", href: "/templates" },
    {
      label: "Profile Perusahaan",
      icon: "🏢",
      href: "/profile",
      authOnly: true,
    },
  ];

  let currentUser = $state(null);

  // state buka/tutup sidebar — default TERTUTUP
  // ini yang dikirim ke AppSidebar sebagai prop "sidebarOpen"
  let sidebarOpen = $state(false);

  function closeSidebar() {
    sidebarOpen = false;
  }

  onMount(() => {
    currentUser = authStore.getCurrentUser();
  });
</script>

<!--
  TOMBOL HAMBURGER
  fixed di pojok kiri atas, cuma ditampilkan saat sidebar TERTUTUP
  (saat sidebar terbuka, tombol ✕ di dalam AppSidebar sudah menggantikannya)
-->
{#if !sidebarOpen}
  <button
    type="button"
    onclick={() => (sidebarOpen = true)}
    aria-label="Buka menu"
    class="fixed top-4 left-4 z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 shadow-md hover:bg-slate-100 dark:hover:bg-white/10 transition"
  >
    <span class="text-lg">☰</span>
  </button>
{/if}

<AppSidebar {menuItems} menuLabel="Menu" {sidebarOpen} onClose={closeSidebar} />

<div
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors"
>
  <!--
    CATATAN: class "lg:pl-64" DIHAPUS dari <main> di bawah ini.
    Karena sidebar sekarang bersifat overlay murni (fixed + z-index,
    tanpa lg:translate-x-0 di dalam AppSidebar), main content tidak
    perlu lagi diberi ruang kosong permanen di kiri.
  -->
  <main>
    <!-- TOP UTILITY BAR: bahasa + dark mode -->
    <div class="flex justify-end items-center gap-2 px-4 sm:px-6 pt-4">
      <div class="relative">
        <select
          value={lang.current}
          onchange={(e) => lang.set(e.target.value)}
          aria-label="Select language"
          class="appearance-none bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-3 pr-8 py-2 text-xs sm:text-sm outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition"
        >
          {#each Object.entries(lang.options) as [code, label]}
            <option value={code} class="bg-white text-slate-900">
              {label}
            </option>
          {/each}
        </select>

        <span
          class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs opacity-60"
        >
          ▾
        </span>
      </div>

      <button
        type="button"
        onclick={() => theme.toggle()}
        aria-label="Toggle dark mode"
        title="Toggle dark mode"
        class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition"
      >
        <span class="text-base">
          {theme.dark ? "☀️" : "🌙"}
        </span>
      </button>
    </div>

    <!-- ================= HERO CARD ================= -->
    <section class="px-4 pt-2">
      <div
        class="max-w-5xl mx-auto rounded-[2rem] overflow-hidden bg-[#111] dark:bg-white text-white dark:text-[#111] transition-colors"
      >
        <div
          class="px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10"
        >
          <!-- HERO TEXT -->
          <div class="flex-1 text-center md:text-left">
            <h1
              class="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            >
              {lang.t("hero_title")}
            </h1>

            <p class="mt-4 opacity-70 max-w-md mx-auto md:mx-0">
              {lang.t("hero_subtitle")}
            </p>

            <div class="mt-8 flex gap-3 justify-center md:justify-start">
              <button
                type="button"
                onclick={() => goto("/editor")}
                class="rounded-full px-6 py-3 font-semibold text-black hover:scale-[1.02] active:scale-[0.98] transition"
                style="background:#8CFF3D"
              >
                {lang.t("hero_cta")}
              </button>

              <a
                href="/templates"
                class="rounded-full px-6 py-3 font-semibold border border-current/30 hover:bg-white/5 dark:hover:bg-black/5 transition"
              >
                {lang.t("see_all")}
              </a>
            </div>
          </div>

          <!-- TEMPLATE PREVIEW -->
          <div class="w-full md:w-80 flex-shrink-0">
            <div class="rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5">
              <TemplatePreview component={InvoiceBoldTypography} />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STATS BAR ================= -->
    <section class="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
      <div
        class="rounded-2xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 dark:divide-white/10 py-6"
      >
        {#each stats as s}
          <div class="text-center px-2">
            <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">
              {s.value}
            </p>
            <p class="text-xs opacity-60 mt-1">
              {s.label}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- ================= TURNING IDEAS ================= -->
    <section
      class="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
    >
      <div>
        <h2 class="text-3xl font-bold leading-tight">
          {lang.t("gallery_title")}
        </h2>
        <p class="mt-4 opacity-60">
          {lang.t("gallery_subtitle")}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          class="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10"
        >
          <TemplatePreview component={Invoice01Neat} />
          <span
            class="absolute bottom-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black"
            style="background:#8CFF3D"
          >
            Neat Minimal
          </span>
        </div>

        <div
          class="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 mt-8"
        >
          <TemplatePreview component={Invoice05DarkStudio} />
          <span
            class="absolute bottom-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black"
          >
            Dark Studio
          </span>
        </div>
      </div>
    </section>

    <!-- ================= OUR SERVICES ================= -->
    <section class="bg-slate-50 dark:bg-[#0d0d0d] py-20 px-6 transition-colors">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold mb-2">
          Our
          <span class="px-2 rounded-lg text-black" style="background:#8CFF3D">
            Services
          </span>
        </h2>

        <p class="opacity-60 mb-10 max-w-md">
          {lang.t("gallery_subtitle")}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
          <!-- SERVICES LIST -->
          <div class="space-y-3">
            {#each services as s, i}
              <div
                class="flex items-center justify-between rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 px-5 py-4 hover:-translate-y-0.5 hover:shadow-sm transition"
              >
                <div class="flex items-center gap-4">
                  <span class="font-bold text-sm" style="color:#8CFF3D">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span class="font-semibold">
                    {lang.t(s.titleKey)}
                  </span>
                </div>
                <span class="opacity-40">→</span>
              </div>
            {/each}
          </div>

          <!-- SERVICE CTA -->
          <div class="grid grid-rows-2 gap-4">
            <div
              class="rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 p-5"
            >
              <p class="text-sm opacity-70 mb-2">Penasaran cara kerjanya?</p>
              <a
                href="/templates"
                class="font-semibold flex items-center gap-1"
                style="color:#8CFF3D"
              >
                Lihat Template
                <span>→</span>
              </a>
            </div>

            <div class="rounded-xl p-5 text-black" style="background:#8CFF3D">
              <p class="text-sm mb-2 opacity-80">
                Siap membuat invoice pertamamu?
              </p>
              <button
                type="button"
                onclick={() => goto("/editor")}
                class="font-semibold flex items-center gap-1 cursor-pointer hover:translate-x-0.5 transition"
              >
                {lang.t("hero_cta")}
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LARGE TEXT ================= -->
    <section class="py-16 text-center">
      <h2 class="text-3xl md:text-5xl font-black tracking-tight">
        Buat
        <span style="color:#8CFF3D">✦</span>
        Kirim
        <span style="color:#8CFF3D">✦</span>
        Dibayar
      </h2>
    </section>

    <!-- ================= CTA + FOOTER ================= -->
    <footer class="px-4 pb-4">
      <div
        class="max-w-5xl mx-auto rounded-[2rem] overflow-hidden"
        style="background:#8CFF3D"
      >
        <div
          class="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-black"
        >
          <div>
            <h3 class="text-2xl font-bold">
              {lang.t("hero_cta")}
            </h3>
            <p class="opacity-70 mt-1">
              {lang.t("hero_subtitle")}
            </p>
          </div>

          <button
            type="button"
            onclick={() => goto("/editor")}
            class="rounded-full px-6 py-3 font-semibold bg-black text-white flex-shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition"
          >
            {lang.t("nav_create")}
          </button>
        </div>

        <div
          class="border-t border-black/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-black/70 text-sm"
        >
          <span class="font-bold text-black"> InvoiceKita </span>
          <span>
            {lang.t("footer")}
          </span>
        </div>
      </div>
    </footer>
  </main>
</div>