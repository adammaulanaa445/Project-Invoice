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
    { component: Invoice01Neat },
    { component: Invoice02Corporate },
    { component: Invoice03BoldBand },
    { component: Invoice04Gradient },
    { component: Invoice05DarkStudio },
    { component: Invoice06Luxury },
    { component: Invoice07Asymmetric },
    { component: Invoice08NatureEco },
    { component: Invoice09TechStartup },
    { component: Invoice10Freelance },
    { component: InvoiceBoldTypography },
    { component: InvoiceDarkTech },
    { component: InvoiceEditorialKoran },
    { component: InvoiceEleganEmas },
    { component: InvoiceGradientVibrant },
    { component: InvoiceKlasikFormal },
    { component: InvoiceKorporatBiru },
    { component: InvoiceModernMinimalis },
    { component: InvoiceNordicEarthy },
    { component: InvoicePastelPlayful },
    { component: InvoiceRetroVintage },
    { component: InvoiceTechSaaS },
    { component: InvoiceCurvedTeal },
    { component: InvoicePixelReceipt },
    { component: InvoiceLedgerKlasik },
    { component: InvoiceSwissGrid },
    { component: InvoiceMotifWarm },
    { component: InvoiceMinimalisMono },
    { component: InvoiceStudioHitam },
    { component: InvoiceBrutalistBracket },
    { component: InvoiceEditorialMerah },
    { component: InvoiceSidebarBiru },
];

  function useTemplate(index) {
    goto(`/editor?template=${index}`);
  }
</script>

<main class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors">

  <!-- HERO CARD MELAYANG -->
  <section class="px-4 pt-4">
    <div class="max-w-6xl mx-auto rounded-[2rem] overflow-hidden bg-[#111] dark:bg-white text-white dark:text-[#111] transition-colors">

      <!-- NAVBAR -->
      <nav class="px-6 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center gap-2 font-bold text-lg">
          <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
          InvoiceKita
        </a>
        <div class="flex gap-4 items-center text-sm">
          <a href="/templates" class="font-medium" style="color:#8CFF3D">{lang.t('nav_templates')}</a>
          <select
            value={lang.current}
            onchange={(e) => lang.set(e.target.value)}
            class="bg-transparent text-sm border border-current/20 rounded-lg px-2 py-1"
          >
            {#each Object.entries(lang.options) as [code, label]}
              <option value={code} class="text-slate-900">{label}</option>
            {/each}
          </select>
          <button onclick={() => theme.toggle()} class="text-lg" aria-label="Toggle dark mode">
            {theme.dark ? '☀️' : '🌙'}
          </button>
          <button
            onclick={() => goto('/editor')}
            class="rounded-full px-5 py-2 font-semibold text-black"
            style="background:#8CFF3D"
          >
            {lang.t('nav_create')}
          </button>
        </div>
      </nav>

      <!-- HERO CONTENT -->
      <div class="px-6 md:px-12 pb-12 pt-4 text-center">
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          {lang.t('tp_title')}
        </h1>
        <p class="mt-4 opacity-70 max-w-lg mx-auto">{lang.t('tp_subtitle')}</p>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <section class="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
    <div class="rounded-2xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 grid grid-cols-4 divide-x divide-slate-200 dark:divide-white/10 py-6">
      <div class="text-center px-2">
        <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">32</p>
        <p class="text-xs opacity-60 mt-1">Template</p>
      </div>
      <div class="text-center px-2">
        <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">10</p>
        <p class="text-xs opacity-60 mt-1">Bahasa</p>
      </div>
      <div class="text-center px-2">
        <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">100%</p>
        <p class="text-xs opacity-60 mt-1">Gratis</p>
      </div>
      <div class="text-center px-2">
        <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">24/7</p>
        <p class="text-xs opacity-60 mt-1">Akses</p>
      </div>
    </div>
  </section>

  <!-- GRID TEMPLATE -->
  <section class="max-w-6xl mx-auto px-6 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {#each templates as t, i}
        <button
          onclick={() => useTemplate(i)}
          class="group text-left rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 hover:border-[#8CFF3D] transition"
        >
          <div class="relative bg-white dark:bg-[#0d0d0d]">
            <span
              class="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black"
              style="background:#8CFF3D"
            >{String(i + 1).padStart(2, '0')}</span>
            <TemplatePreview component={t.component} />
          </div>
          <div class="p-3">
            <p class="font-semibold text-sm">{lang.t(t.nameKey)}</p>
            <p class="text-xs opacity-50 mt-0.5">{lang.t(t.descKey)}</p>
            <p class="text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition" style="color:#8CFF3D">{lang.t('use_template')} →</p>
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- CTA + FOOTER -->
  <footer class="px-4 pb-4">
    <div class="max-w-6xl mx-auto rounded-[2rem] overflow-hidden" style="background:#8CFF3D">
      <div class="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-black">
        <div>
          <h3 class="text-2xl font-bold">{lang.t('hero_cta')}</h3>
          <p class="opacity-70 mt-1">{lang.t('hero_subtitle')}</p>
        </div>
        <button
          onclick={() => goto('/editor')}
          class="rounded-full px-6 py-3 font-semibold bg-black text-white flex-shrink-0"
        >
          {lang.t('nav_create')}
        </button>
      </div>
      <div class="border-t border-black/10 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-black/70 text-sm">
        <span class="font-bold text-black">InvoiceKita</span>
        <span>{lang.t('footer')}</span>
      </div>
    </div>
  </footer>

</main>
