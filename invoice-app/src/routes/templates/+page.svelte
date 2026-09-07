<script>
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';

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
    { nameKey: 'tpl42_name', descKey: 'tpl42_desc', component: InvoiceSlateCorporate }
  ];

  // =========================
  // SIDEBAR
  // =========================

  let sidebarOpen = $state(true);

  function closeSidebar() {
    sidebarOpen = false;
  }

  function openSidebar() {
    sidebarOpen = true;
  }

  // =========================
  // PILIH TEMPLATE
  // =========================

  function useTemplate(index) {
    goto(`/editor?template=${index}`);
  }

  // =========================
  // SEARCH & FILTER
  // =========================

  let searchQuery = $state('');
  let activeCategory = $state('Semua');

  const categories = [
    'Semua',
    'Minimalis',
    'Modern',
    'Korporat',
    'Kreatif',
    'Elegan'
  ];

  let filteredTemplates = $derived(
    templates
      .map((t, i) => ({ ...t, index: i }))
      .filter((t) =>
        lang.t(t.nameKey)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
  );
</script>

<div class="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors">

  <!-- =====================================================
       OVERLAY MOBILE
       ===================================================== -->

  {#if sidebarOpen}
    <button
      type="button"
      aria-label="Tutup menu"
      onclick={closeSidebar}
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    ></button>
  {/if}


  <!-- =====================================================
       SIDEBAR
       ===================================================== -->

  {#if sidebarOpen}
    <aside
      class="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#111111] text-white shadow-2xl"
    >

      <!-- HEADER -->
      <div class="flex h-20 shrink-0 items-center justify-between px-5">

        <a
          href="/"
          class="flex items-center gap-3"
          aria-label="InvoiceKita"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8CFF3D] text-lg font-black text-black"
          >
            I
          </div>

          <span class="text-lg font-bold">
            InvoiceKita
          </span>
        </a>

        <!-- X BUTTON -->
        <button
          type="button"
          onclick={closeSidebar}
          aria-label="Tutup sidebar"
          title="Tutup sidebar"
          class="relative z-[60] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-2xl font-light text-white transition hover:bg-white/10 hover:text-[#8CFF3D] active:scale-95"
        >
          ×
        </button>

      </div>


      <!-- MENU -->
      <nav class="flex-1 px-3 pt-3">

        <p class="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Menu
        </p>

        <!-- DASHBOARD -->
        <a
          href="/"
          class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <span class="text-base">📊</span>
          <span>Dashboard</span>
        </a>

        <!-- TEMPLATE -->
        <a
          href="/templates"
          aria-current="page"
          class="mb-1 flex items-center gap-3 rounded-xl bg-[#8CFF3D] px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          <span class="text-base">🎨</span>
          <span>Template</span>
        </a>

        <!-- PROFILE -->
        <a
          href="/profile"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <span class="text-base">🏢</span>
          <span>Profile Perusahaan</span>
        </a>

      </nav>


      <!-- BOTTOM SIDEBAR -->
      <div class="shrink-0 border-t border-white/10 p-4">

        <div class="mb-4 flex items-center gap-3">

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8CFF3D] font-bold text-black"
          >
            F
          </div>

          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-white">
              Fahri rijalul ihsan
            </p>

            <p class="truncate text-xs text-white/40">
              InvoiceKita
            </p>
          </div>

        </div>

        <a
          href="/"
          class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <span>🚪</span>
          <span>Keluar</span>
        </a>

      </div>

    </aside>
  {/if}


  <!-- =====================================================
       BUTTON OPEN SIDEBAR
       ===================================================== -->

  {#if !sidebarOpen}
    <button
      type="button"
      onclick={openSidebar}
      aria-label="Buka menu"
      title="Buka menu"
      class="fixed left-4 top-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#111111] text-xl text-white shadow-xl transition hover:bg-[#222222] active:scale-95"
    >
      ☰
    </button>
  {/if}


  <!-- =====================================================
       MAIN CONTENT
       ===================================================== -->

  <div class={sidebarOpen ? 'min-h-screen lg:pl-64' : 'min-h-screen'}>

    <div class="p-6 md:p-10">

      <!-- HEADER -->
      <div class="mb-6 flex items-center justify-between">

        <div>
          <h1 class="text-2xl font-bold">
            Pilih Template Invoice
          </h1>

          <p class="mt-1 text-sm opacity-60">
            Temukan desain invoice yang cocok untuk bisnis kamu.
          </p>
        </div>

        <!-- DARK MODE -->
        <button
          type="button"
          onclick={() => theme.toggle()}
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-lg transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Toggle dark mode"
          title="Mode gelap/terang"
        >
          {theme.dark ? '☀️' : '🌙'}
        </button>

      </div>


      <!-- =================================================
           SEARCH
           ================================================= -->

      <div class="relative mb-4 max-w-md">

        <span
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm opacity-40"
        >
          🔍
        </span>

        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Cari template..."
          class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 dark:border-white/10 dark:bg-[#111111]"
          style="--tw-ring-color:#8CFF3D"
        />

      </div>


      <!-- =================================================
           CATEGORY
           ================================================= -->

      <div class="mb-8 flex flex-wrap gap-2">

        {#each categories as cat}

        <button
  type="button"
  onclick={() => activeCategory = cat}
  class="cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition hover:opacity-100
    {activeCategory === cat
      ? 'text-black'
      : 'bg-slate-100 dark:bg-white/5 opacity-70 hover:opacity-100'}"
  style={activeCategory === cat ? 'background:#8CFF3D' : ''}
  {cat}
</button>
        {/each}

      </div>


      <!-- =================================================
           GRID TEMPLATE
           ================================================= -->

      <div class="grid grid-cols-2 gap-5 md:grid-cols-4">

        {#each filteredTemplates as t (t.index)}

          <div
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-[#8CFF3D] dark:border-white/10 dark:bg-[#111111]"
          >

            <!-- PREVIEW -->
            <div class="relative bg-slate-50 dark:bg-[#0d0d0d]">

              <span
                class="absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-semibold uppercase text-black"
                style="background:#8CFF3D"
              >
                {String(t.index + 1).padStart(2, '0')}
              </span>

              <TemplatePreview component={t.component} />

            </div>


            <!-- INFO -->
            <div class="space-y-2 p-3">

              <p class="truncate text-sm font-semibold">
                {lang.t(t.nameKey)}
              </p>

              <button
                type="button"
                onclick={() => useTemplate(t.index)}
                class="w-full cursor-pointer rounded-full py-2 text-xs font-semibold text-black transition hover:opacity-90 active:scale-[0.98]"
                style="background:#8CFF3D"
              >
                Gunakan Template →
              </button>

            </div>

          </div>

        {/each}

      </div>


      <!-- EMPTY -->
      {#if filteredTemplates.length === 0}

        <p class="py-16 text-center text-sm opacity-50">
          Template tidak ditemukan.
        </p>

      {/if}

    </div>

  </div>

</div>