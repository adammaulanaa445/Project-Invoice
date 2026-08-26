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
    { nameKey: 'tpl32_name', descKey: 'tpl32_desc', component: InvoiceSidebarBiru }
  ];

  function useTemplate(index) {
    goto(`/editor?template=${index}`);
  }
</script>

<main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">

  <!-- NAVBAR -->
  <nav class="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
    <a href="/" class="font-bold text-xl text-slate-900 dark:text-white">InvoiceKita</a>

    <div class="flex gap-4 items-center text-sm">
      <a href="/templates" class="text-blue-600 dark:text-blue-400 font-medium">
        {lang.t('nav_templates')}
      </a>

      <select
        value={lang.current}
        onchange={(e) => lang.set(e.target.value)}
        class="bg-transparent text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 dark:text-white"
      >
        {#each Object.entries(lang.options) as [code, label]}
          <option value={code}>{label}</option>
        {/each}
      </select>

      <button onclick={() => theme.toggle()} class="text-lg" aria-label="Toggle dark mode">
        {theme.dark ? '☀️' : '🌙'}
      </button>

      <button
        onclick={() => goto('/editor')}
        class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {lang.t('nav_create')}
      </button>
    </div>
  </nav>

  <!-- CONTENT -->
  <div class="max-w-6xl mx-auto px-6 py-12">

    <h1 class="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
      {lang.t('tp_title')}
    </h1>

    <p class="text-center text-slate-500 dark:text-slate-400 mb-10">
      {lang.t('tp_subtitle')}
    </p>

    <!-- TEMPLATE GRID -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {#each templates as t, i}
        <button
          onclick={() => useTemplate(i)}
          class="group text-left rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-blue-400 transition bg-white dark:bg-slate-800"
        >
          <TemplatePreview component={t.component} />

          <div class="p-3 bg-white dark:bg-slate-800">
            <p class="font-semibold text-sm text-slate-800 dark:text-white">{lang.t(t.nameKey)}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lang.t(t.descKey)}</p>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium mt-2 opacity-0 group-hover:opacity-100 transition">{lang.t('use_template')}</p>
          </div>
        </button>
      {/each}
    </div>

  </div>

</main>