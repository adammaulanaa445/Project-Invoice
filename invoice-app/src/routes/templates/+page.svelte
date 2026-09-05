<script>
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';
  import { authStore } from '$lib/authStore.svelte.js';
  import { onMount } from 'svelte';

  import TemplatePreview from '$lib/components/TemplatePreview.svelte';

  import Invoice01Neat from '$lib/components/invoices/Invoice01Neat.svelte';
  import Invoice02Corporate from '$lib/components/invoices/Invoice02Corporate.svelte';
  import Invoice03BoldBand from '$lib/components/invoices/Invoice03BoldBand.svelte';
  import Invoice04Gradient from '$lib/components/invoices/Invoice04Gradient.svelte';
  import Invoice05DarkStudio from '$lib/components/invoices/Invoice05DarkStudio.svelte';
  import Invoice06Luxury from '$lib/components/invoices/Invoice06Luxury.svelte';
  import Invoice07Asymmetric from '$lib/components/invoices/Invoice07Asymmetric.svelte';
  import Invoice08NatureEco from '$lib/components/invoices/Invoice08NatureEco.svelte';
  import Invoice09TechStartup from '$lib/components/invoices/Invoice09TechStartup.svelte';
  import Invoice10Freelance from '$lib/components/invoices/Invoice10Freelance.svelte';
  import InvoiceBoldTypography from '$lib/components/invoices/InvoiceBoldTypography.svelte';
  import InvoiceDarkTech from '$lib/components/invoices/InvoiceDarkTech.svelte';
  import InvoiceEditorialKoran from '$lib/components/invoices/InvoiceEditorialKoran.svelte';
  import InvoiceEleganEmas from '$lib/components/invoices/InvoiceEleganEmas.svelte';
  import InvoiceGradientVibrant from '$lib/components/invoices/InvoiceGradientVibrant.svelte';
  import InvoiceKlasikFormal from '$lib/components/invoices/InvoiceKlasikFormal.svelte';
  import InvoiceKorporatBiru from '$lib/components/invoices/InvoiceKorporatBiru.svelte';
  import InvoiceModernMinimalis from '$lib/components/invoices/InvoiceModernMinimalis.svelte';
  import InvoiceNordicEarthy from '$lib/components/invoices/InvoiceNordicEarthy.svelte';
  import InvoicePastelPlayful from '$lib/components/invoices/InvoicePastelPlayful.svelte';
  import InvoiceRetroVintage from '$lib/components/invoices/InvoiceRetroVintage.svelte';
  import InvoiceTechSaaS from '$lib/components/invoices/InvoiceTechSaaS.svelte';
  import InvoiceCurvedTeal from '$lib/components/invoices/InvoiceCurvedTeal.svelte';
  import InvoicePixelReceipt from '$lib/components/invoices/InvoicePixelReceipt.svelte';
  import InvoiceLedgerKlasik from '$lib/components/invoices/InvoiceLedgerKlasik.svelte';
  import InvoiceSwissGrid from '$lib/components/invoices/InvoiceSwissGrid.svelte';
  import InvoiceMotifWarm from '$lib/components/invoices/InvoiceMotifWarm.svelte';
  import InvoiceMinimalisMono from '$lib/components/invoices/InvoiceMinimalisMono.svelte';
  import InvoiceStudioHitam from '$lib/components/invoices/InvoiceStudioHitam.svelte';
  import InvoiceBrutalistBracket from '$lib/components/invoices/InvoiceBrutalistBracket.svelte';
  import InvoiceEditorialMerah from '$lib/components/invoices/InvoiceEditorialMerah.svelte';
  import InvoiceSidebarBiru from '$lib/components/invoices/InvoiceSidebarBiru.svelte';
  import InvoiceAuroraNight from '$lib/components/invoices/InvoiceAuroraNight.svelte';
  import InvoiceCreamMonogramme from '$lib/components/invoices/InvoiceCreamMonogramme.svelte';
  import InvoiceDottedBlueWave from '$lib/components/invoices/InvoiceDottedBlueWave.svelte';
  import InvoiceIndigoSwirl from '$lib/components/invoices/InvoiceIndigoSwirl.svelte';
  import InvoiceCrimsonVAT from '$lib/components/invoices/InvoiceCrimsonVAT.svelte';
  import InvoicePillRowsIndigo from '$lib/components/invoices/InvoicePillRowsIndigo.svelte';
  import InvoiceSignatureCream from '$lib/components/invoices/InvoiceSignatureCream.svelte';
  import InvoiceLavenderSoft from '$lib/components/invoices/InvoiceLavenderSoft.svelte';
  import InvoiceCoralGradientBar from '$lib/components/invoices/InvoiceCoralGradientBar.svelte';
  import InvoiceSlateCorporate from '$lib/components/invoices/InvoiceSlateCorporate.svelte';


  // =========================
  // DATA TEMPLATE
  // =========================

  const templates = [
    { nameKey: 'tpl1_name', descKey: 'tpl1_desc', component: Invoice01Neat },
    { nameKey: 'tpl2_name', descKey: 'tpl2_desc', component: Invoice02Corporate },
    { nameKey: 'tpl3_name', descKey: 'tpl3_desc', component: Invoice03BoldBand },
    { nameKey: 'tpl4_name', descKey: 'tpl4_desc', component: Invoice04Gradient },
    { nameKey: 'tpl5_name', descKey: 'tpl5_desc', component: Invoice05DarkStudio },
    { nameKey: 'tpl6_name', descKey: 'tpl6_desc', component: Invoice06Luxury },
    { nameKey: 'tpl7_name', descKey: 'tpl7_desc', component: Invoice07Asymmetric },
    { nameKey: 'tpl8_name', descKey: 'tpl8_desc', component: Invoice08NatureEco },
    { nameKey: 'tpl9_name', descKey: 'tpl9_desc', component: Invoice09TechStartup },
    { nameKey: 'tpl10_name', descKey: 'tpl10_desc', component: Invoice10Freelance },
    { nameKey: 'tpl11_name', descKey: 'tpl11_desc', component: InvoiceBoldTypography },
    { nameKey: 'tpl12_name', descKey: 'tpl12_desc', component: InvoiceDarkTech },
    { nameKey: 'tpl13_name', descKey: 'tpl13_desc', component: InvoiceEditorialKoran },
    { nameKey: 'tpl14_name', descKey: 'tpl14_desc', component: InvoiceEleganEmas },
    { nameKey: 'tpl15_name', descKey: 'tpl15_desc', component: InvoiceGradientVibrant },
    { nameKey: 'tpl16_name', descKey: 'tpl16_desc', component: InvoiceKlasikFormal },
    { nameKey: 'tpl17_name', descKey: 'tpl17_desc', component: InvoiceKorporatBiru },
    { nameKey: 'tpl18_name', descKey: 'tpl18_desc', component: InvoiceModernMinimalis },
    { nameKey: 'tpl19_name', descKey: 'tpl19_desc', component: InvoiceNordicEarthy },
    { nameKey: 'tpl20_name', descKey: 'tpl20_desc', component: InvoicePastelPlayful },
    { nameKey: 'tpl21_name', descKey: 'tpl21_desc', component: InvoiceRetroVintage },
    { nameKey: 'tpl22_name', descKey: 'tpl22_desc', component: InvoiceTechSaaS },
    { nameKey: 'tpl23_name', descKey: 'tpl23_desc', component: InvoiceCurvedTeal },
    { nameKey: 'tpl24_name', descKey: 'tpl24_desc', component: InvoicePixelReceipt },
    { nameKey: 'tpl25_name', descKey: 'tpl25_desc', component: InvoiceLedgerKlasik },
    { nameKey: 'tpl26_name', descKey: 'tpl26_desc', component: InvoiceSwissGrid },
    { nameKey: 'tpl27_name', descKey: 'tpl27_desc', component: InvoiceMotifWarm },
    { nameKey: 'tpl28_name', descKey: 'tpl28_desc', component: InvoiceMinimalisMono },
    { nameKey: 'tpl29_name', descKey: 'tpl29_desc', component: InvoiceStudioHitam },
    { nameKey: 'tpl30_name', descKey: 'tpl30_desc', component: InvoiceBrutalistBracket },
    { nameKey: 'tpl31_name', descKey: 'tpl31_desc', component: InvoiceEditorialMerah },
    { nameKey: 'tpl32_name', descKey: 'tpl32_desc', component: InvoiceSidebarBiru },
    { nameKey: 'tpl33_name', descKey: 'tpl33_desc', component: InvoiceAuroraNight },
    { nameKey: 'tpl34_name', descKey: 'tpl34_desc', component: InvoiceCreamMonogramme },
    { nameKey: 'tpl35_name', descKey: 'tpl35_desc', component: InvoiceDottedBlueWave },
    { nameKey: 'tpl36_name', descKey: 'tpl36_desc', component: InvoiceIndigoSwirl },
    { nameKey: 'tpl37_name', descKey: 'tpl37_desc', component: InvoiceCrimsonVAT },
    { nameKey: 'tpl38_name', descKey: 'tpl38_desc', component: InvoicePillRowsIndigo },
    { nameKey: 'tpl39_name', descKey: 'tpl39_desc', component: InvoiceSignatureCream },
    { nameKey: 'tpl40_name', descKey: 'tpl40_desc', component: InvoiceLavenderSoft },
    { nameKey: 'tpl41_name', descKey: 'tpl41_desc', component: InvoiceCoralGradientBar },
    { nameKey: 'tpl42_name', descKey: 'tpl42_desc', component: InvoiceSlateCorporate },
  ];


  // =========================
  // AUTH USER
  // =========================

  let currentUser = $state(null);
  let showMenu = $state(false);


  onMount(() => {
    currentUser = authStore.getCurrentUser();
  });


  function handleLogout() {
    authStore.logout();
    currentUser = null;
    showMenu = false;
    goto('/');
  }


  // =========================
  // PILIH TEMPLATE
  // =========================

  function useTemplate(index) {
    goto(`/editor?template=${index}`);
  }
</script>


<main class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors">

  <!-- HERO CARD MELAYANG -->
  <section class="px-4 pt-4">

    <div
      class="max-w-6xl mx-auto rounded-[2rem] overflow-hidden bg-[#111] dark:bg-white text-white dark:text-[#111] transition-colors"
    >

      <!-- =========================
           NAVBAR
      ========================== -->
      <nav class="px-6 py-4 flex justify-between items-center">

        <!-- LOGO -->
        <a
          href="/"
          class="flex items-center gap-2 font-bold text-lg"
        >
          <span
            class="w-3 h-3 rounded-full"
            style="background:#8CFF3D"
          ></span>

          InvoiceKita
        </a>


        <!-- NAVIGATION -->
        <div class="flex gap-4 items-center text-sm">

          <!-- TEMPLATE -->
          <a
            href="/templates"
            class="font-medium"
            style="color:#8CFF3D"
          >
            {lang.t('nav_templates')}
          </a>


          <!-- LANGUAGE -->
          <select
            value={lang.current}
            onchange={(e) => lang.set(e.target.value)}
            class="bg-transparent text-sm border border-current/20 rounded-lg px-2 py-1"
          >
            {#each Object.entries(lang.options) as [code, label]}
              <option
                value={code}
                class="text-slate-900"
              >
                {label}
              </option>
            {/each}
          </select>


          <!-- DARK MODE -->
          <button
            onclick={() => theme.toggle()}
            class="text-lg"
            aria-label="Toggle dark mode"
          >
            {theme.dark ? '☀️' : '🌙'}
          </button>


          <!-- =========================
               JIKA SUDAH LOGIN
          ========================== -->
          {#if currentUser}

            <div class="relative">

              <!-- USER BUTTON -->
              <button
                onclick={() => showMenu = !showMenu}
                class="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border border-current/30 hover:opacity-80 transition"
              >

                <!-- AVATAR -->
                <span
                  class="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs font-bold"
                  style="background:#8CFF3D"
                >
                  {currentUser.name?.charAt(0).toUpperCase() ?? '?'}
                </span>


                <!-- USER NAME -->
                <span class="font-medium max-w-[100px] truncate">
                  {currentUser.name}
                </span>

              </button>


              <!-- DROPDOWN -->
              {#if showMenu}

                <div
                  class="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden z-20 text-slate-900 dark:text-white"
                >

                  <!-- USER INFO -->
                  <div
                    class="px-4 py-3 border-b border-slate-100 dark:border-white/10"
                  >

                    <p class="text-sm font-semibold truncate">
                      {currentUser.name}
                    </p>

                    <p class="text-xs opacity-60 truncate">
                      {currentUser.email}
                    </p>

                  </div>


                  <!-- LOGOUT -->
                  <button
                    onclick={handleLogout}
                    class="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    Logout
                  </button>

                </div>

              {/if}

            </div>


          {:else}

            <!-- =========================
                 JIKA BELUM LOGIN
            ========================== -->

            <!-- LOGIN -->
            <a
              href="/login"
              class="rounded-full px-4 py-2 font-semibold border border-current/30 hover:opacity-80 transition"
            >
              Login
            </a>


            <!-- BUAT INVOICE -->
            <button
              onclick={() => goto('/editor')}
              class="rounded-full px-5 py-2 font-semibold text-black"
              style="background:#8CFF3D"
            >
              {lang.t('nav_create')}
            </button>

          {/if}

        </div>
      </nav>


      <!-- =========================
           HERO CONTENT
      ========================== -->

      <div class="px-6 md:px-12 pb-12 pt-4 text-center">

        <h1 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          {lang.t('tp_title')}
        </h1>

        <p class="mt-4 opacity-70 max-w-lg mx-auto">
          {lang.t('tp_subtitle')}
        </p>

      </div>

    </div>
  </section>


  <!-- =========================
       STATS BAR
  ========================== -->

  <section class="max-w-4xl mx-auto px-6 -mt-8 relative z-10">

    <div
      class="rounded-2xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 grid grid-cols-4 divide-x divide-slate-200 dark:divide-white/10 py-6"
    >

      <div class="text-center px-2">
        <p
          class="text-2xl md:text-3xl font-bold"
          style="color:#8CFF3D"
        >
          42
        </p>

        <p class="text-xs opacity-60 mt-1">
          Template
        </p>
      </div>


      <div class="text-center px-2">
        <p
          class="text-2xl md:text-3xl font-bold"
          style="color:#8CFF3D"
        >
          10
        </p>

        <p class="text-xs opacity-60 mt-1">
          Bahasa
        </p>
      </div>


      <div class="text-center px-2">
        <p
          class="text-2xl md:text-3xl font-bold"
          style="color:#8CFF3D"
        >
          100%
        </p>

        <p class="text-xs opacity-60 mt-1">
          Gratis
        </p>
      </div>


      <div class="text-center px-2">
        <p
          class="text-2xl md:text-3xl font-bold"
          style="color:#8CFF3D"
        >
          24/7
        </p>

        <p class="text-xs opacity-60 mt-1">
          Akses
        </p>
      </div>

    </div>
  </section>


  <!-- =========================
       GRID TEMPLATE
  ========================== -->

  <section class="max-w-6xl mx-auto px-6 py-16">

    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">

      {#each templates as t, i}

        <button
          onclick={() => useTemplate(i)}
          class="group text-left rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 hover:border-[#8CFF3D] transition duration-300 hover:-translate-y-4"
        >

          <div class="relative bg-white dark:bg-[#0d0d0d]">

            <!-- NOMOR TEMPLATE -->
            <span
              class="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black"
              style="background:#8CFF3D"
            >
              {String(i + 1).padStart(2, '0')}
            </span>


            <!-- PREVIEW -->
            <TemplatePreview component={t.component} />

          </div>


          <!-- TEMPLATE NAME -->
          <div class="p-3">

            <p class="font-semibold text-sm">
              {lang.t(t.nameKey)}
            </p>


            <p
              class="text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition"
              style="color:#8CFF3D"
            >
              {lang.t('use_template')} →
            </p>

          </div>

        </button>

      {/each}

    </div>

  </section>


  <!-- =========================
       CTA + FOOTER
  ========================== -->

  <footer class="px-4 pb-4">

    <div
      class="max-w-6xl mx-auto rounded-[2rem] overflow-hidden"
      style="background:#8CFF3D"
    >

      <div
        class="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-black"
      >

        <div>

          <h3 class="text-2xl font-bold">
            {lang.t('hero_cta')}
          </h3>

          <p class="opacity-70 mt-1">
            {lang.t('hero_subtitle')}
          </p>

        </div>


        <button
          onclick={() => goto('/editor')}
          class="rounded-full px-6 py-3 font-semibold bg-black text-white flex-shrink-0"
        >
          {lang.t('nav_create')}
        </button>

      </div>


      <!-- FOOTER BOTTOM -->
      <div
        class="border-t border-black/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-black/70 text-sm"
      >

        <span class="font-bold text-black">
          InvoiceKita
        </span>

        <span>
          {lang.t('footer')}
        </span>

      </div>

    </div>

  </footer>

</main>