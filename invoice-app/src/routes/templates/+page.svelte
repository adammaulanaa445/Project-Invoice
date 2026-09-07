<script>
  import { goto } from "$app/navigation";
  import { theme } from "$lib/theme.svelte.js";
  import { lang } from "$lib/lang.svelte.js";

  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import TemplatePreview from "$lib/components/TemplatePreview.svelte";

  import Invoice01Neat from "$lib/components/invoices/Invoice01Neat.svelte";
  import Invoice02Corporate from "$lib/components/invoices/Invoice02Corporate.svelte";
  import Invoice03BoldBand from "$lib/components/invoices/Invoice03BoldBand.svelte";
  import Invoice04Gradient from "$lib/components/invoices/Invoice04Gradient.svelte";
  import Invoice05DarkStudio from "$lib/components/invoices/Invoice05DarkStudio.svelte";
  import Invoice06Luxury from "$lib/components/invoices/Invoice06Luxury.svelte";
  import Invoice07Asymmetric from "$lib/components/invoices/Invoice07Asymmetric.svelte";
  import Invoice08NatureEco from "$lib/components/invoices/Invoice08NatureEco.svelte";
  import Invoice09TechStartup from "$lib/components/invoices/Invoice09TechStartup.svelte";
  import Invoice10Freelance from "$lib/components/invoices/Invoice10Freelance.svelte";
  import InvoiceBoldTypography from "$lib/components/invoices/InvoiceBoldTypography.svelte";
  import InvoiceDarkTech from "$lib/components/invoices/InvoiceDarkTech.svelte";
  import InvoiceEditorialKoran from "$lib/components/invoices/InvoiceEditorialKoran.svelte";
  import InvoiceEleganEmas from "$lib/components/invoices/InvoiceEleganEmas.svelte";
  import InvoiceGradientVibrant from "$lib/components/invoices/InvoiceGradientVibrant.svelte";
  import InvoiceKlasikFormal from "$lib/components/invoices/InvoiceKlasikFormal.svelte";
  import InvoiceKorporatBiru from "$lib/components/invoices/InvoiceKorporatBiru.svelte";
  import InvoiceModernMinimalis from "$lib/components/invoices/InvoiceModernMinimalis.svelte";
  import InvoiceNordicEarthy from "$lib/components/invoices/InvoiceNordicEarthy.svelte";
  import InvoicePastelPlayful from "$lib/components/invoices/InvoicePastelPlayful.svelte";
  import InvoiceRetroVintage from "$lib/components/invoices/InvoiceRetroVintage.svelte";
  import InvoiceTechSaaS from "$lib/components/invoices/InvoiceTechSaaS.svelte";
  import InvoiceCurvedTeal from "$lib/components/invoices/InvoiceCurvedTeal.svelte";
  import InvoicePixelReceipt from "$lib/components/invoices/InvoicePixelReceipt.svelte";
  import InvoiceLedgerKlasik from "$lib/components/invoices/InvoiceLedgerKlasik.svelte";
  import InvoiceSwissGrid from "$lib/components/invoices/InvoiceSwissGrid.svelte";
  import InvoiceMotifWarm from "$lib/components/invoices/InvoiceMotifWarm.svelte";
  import InvoiceMinimalisMono from "$lib/components/invoices/InvoiceMinimalisMono.svelte";
  import InvoiceStudioHitam from "$lib/components/invoices/InvoiceStudioHitam.svelte";
  import InvoiceBrutalistBracket from "$lib/components/invoices/InvoiceBrutalistBracket.svelte";
  import InvoiceEditorialMerah from "$lib/components/invoices/InvoiceEditorialMerah.svelte";
  import InvoiceSidebarBiru from "$lib/components/invoices/InvoiceSidebarBiru.svelte";
  import InvoiceAuroraNight from "$lib/components/invoices/InvoiceAuroraNight.svelte";
  import InvoiceCreamMonogramme from "$lib/components/invoices/InvoiceCreamMonogramme.svelte";
  import InvoiceDottedBlueWave from "$lib/components/invoices/InvoiceDottedBlueWave.svelte";
  import InvoiceIndigoSwirl from "$lib/components/invoices/InvoiceIndigoSwirl.svelte";
  import InvoiceCrimsonVAT from "$lib/components/invoices/InvoiceCrimsonVAT.svelte";
  import InvoicePillRowsIndigo from "$lib/components/invoices/InvoicePillRowsIndigo.svelte";
  import InvoiceSignatureCream from "$lib/components/invoices/InvoiceSignatureCream.svelte";
  import InvoiceLavenderSoft from "$lib/components/invoices/InvoiceLavenderSoft.svelte";
  import InvoiceCoralGradientBar from "$lib/components/invoices/InvoiceCoralGradientBar.svelte";
  import InvoiceSlateCorporate from "$lib/components/invoices/InvoiceSlateCorporate.svelte";

  // =========================
  // DATA TEMPLATE (tidak diubah)
  // =========================

  const templates = [
    { nameKey: "tpl1_name", descKey: "tpl1_desc", component: Invoice01Neat },
    {
      nameKey: "tpl2_name",
      descKey: "tpl2_desc",
      component: Invoice02Corporate,
    },
    {
      nameKey: "tpl3_name",
      descKey: "tpl3_desc",
      component: Invoice03BoldBand,
    },
    {
      nameKey: "tpl4_name",
      descKey: "tpl4_desc",
      component: Invoice04Gradient,
    },
    {
      nameKey: "tpl5_name",
      descKey: "tpl5_desc",
      component: Invoice05DarkStudio,
    },
    { nameKey: "tpl6_name", descKey: "tpl6_desc", component: Invoice06Luxury },
    {
      nameKey: "tpl7_name",
      descKey: "tpl7_desc",
      component: Invoice07Asymmetric,
    },
    {
      nameKey: "tpl8_name",
      descKey: "tpl8_desc",
      component: Invoice08NatureEco,
    },
    {
      nameKey: "tpl9_name",
      descKey: "tpl9_desc",
      component: Invoice09TechStartup,
    },
    {
      nameKey: "tpl10_name",
      descKey: "tpl10_desc",
      component: Invoice10Freelance,
    },
    {
      nameKey: "tpl11_name",
      descKey: "tpl11_desc",
      component: InvoiceBoldTypography,
    },
    {
      nameKey: "tpl12_name",
      descKey: "tpl12_desc",
      component: InvoiceDarkTech,
    },
    {
      nameKey: "tpl13_name",
      descKey: "tpl13_desc",
      component: InvoiceEditorialKoran,
    },
    {
      nameKey: "tpl14_name",
      descKey: "tpl14_desc",
      component: InvoiceEleganEmas,
    },
    {
      nameKey: "tpl15_name",
      descKey: "tpl15_desc",
      component: InvoiceGradientVibrant,
    },
    {
      nameKey: "tpl16_name",
      descKey: "tpl16_desc",
      component: InvoiceKlasikFormal,
    },
    {
      nameKey: "tpl17_name",
      descKey: "tpl17_desc",
      component: InvoiceKorporatBiru,
    },
    {
      nameKey: "tpl18_name",
      descKey: "tpl18_desc",
      component: InvoiceModernMinimalis,
    },
    {
      nameKey: "tpl19_name",
      descKey: "tpl19_desc",
      component: InvoiceNordicEarthy,
    },
    {
      nameKey: "tpl20_name",
      descKey: "tpl20_desc",
      component: InvoicePastelPlayful,
    },
    {
      nameKey: "tpl21_name",
      descKey: "tpl21_desc",
      component: InvoiceRetroVintage,
    },
    {
      nameKey: "tpl22_name",
      descKey: "tpl22_desc",
      component: InvoiceTechSaaS,
    },
    {
      nameKey: "tpl23_name",
      descKey: "tpl23_desc",
      component: InvoiceCurvedTeal,
    },
    {
      nameKey: "tpl24_name",
      descKey: "tpl24_desc",
      component: InvoicePixelReceipt,
    },
    {
      nameKey: "tpl25_name",
      descKey: "tpl25_desc",
      component: InvoiceLedgerKlasik,
    },
    {
      nameKey: "tpl26_name",
      descKey: "tpl26_desc",
      component: InvoiceSwissGrid,
    },
    {
      nameKey: "tpl27_name",
      descKey: "tpl27_desc",
      component: InvoiceMotifWarm,
    },
    {
      nameKey: "tpl28_name",
      descKey: "tpl28_desc",
      component: InvoiceMinimalisMono,
    },
    {
      nameKey: "tpl29_name",
      descKey: "tpl29_desc",
      component: InvoiceStudioHitam,
    },
    {
      nameKey: "tpl30_name",
      descKey: "tpl30_desc",
      component: InvoiceBrutalistBracket,
    },
    {
      nameKey: "tpl31_name",
      descKey: "tpl31_desc",
      component: InvoiceEditorialMerah,
    },
    {
      nameKey: "tpl32_name",
      descKey: "tpl32_desc",
      component: InvoiceSidebarBiru,
    },
    {
      nameKey: "tpl33_name",
      descKey: "tpl33_desc",
      component: InvoiceAuroraNight,
    },
    {
      nameKey: "tpl34_name",
      descKey: "tpl34_desc",
      component: InvoiceCreamMonogramme,
    },
    {
      nameKey: "tpl35_name",
      descKey: "tpl35_desc",
      component: InvoiceDottedBlueWave,
    },
    {
      nameKey: "tpl36_name",
      descKey: "tpl36_desc",
      component: InvoiceIndigoSwirl,
    },
    {
      nameKey: "tpl37_name",
      descKey: "tpl37_desc",
      component: InvoiceCrimsonVAT,
    },
    {
      nameKey: "tpl38_name",
      descKey: "tpl38_desc",
      component: InvoicePillRowsIndigo,
    },
    {
      nameKey: "tpl39_name",
      descKey: "tpl39_desc",
      component: InvoiceSignatureCream,
    },
    {
      nameKey: "tpl40_name",
      descKey: "tpl40_desc",
      component: InvoiceLavenderSoft,
    },
    {
      nameKey: "tpl41_name",
      descKey: "tpl41_desc",
      component: InvoiceCoralGradientBar,
    },
    {
      nameKey: "tpl42_name",
      descKey: "tpl42_desc",
      component: InvoiceSlateCorporate,
    },
  ];

  // =========================
  // PILIH TEMPLATE (tidak diubah)
  // =========================

  function useTemplate(index) {
    goto(`/editor?template=${index}`);
  }

  // =========================
  // MENU UNTUK AppSidebar (khusus halaman ini)
  // =========================

  const dashboardMenuItems = [
    { label: "Dashboard", icon: "📊", href: "/" },
    { label: "Template", icon: "🎨", href: "/templates" },
    { label: "Profile Perusahaan", icon: "🏢", href: "/profile" },
  ];

  // =========================
  // UI-ONLY: search & filter tampilan
  // (tidak menyentuh data/backend, hanya memfilter tampilan di client)
  // =========================

  let searchQuery = $state("");
  let activeCategory = $state("Semua");
  const categories = [
    "Semua",
    "Minimalis",
    "Modern",
    "Korporat",
    "Kreatif",
    "Elegan",
  ];


  let filteredTemplates = $derived(
    templates
      .map((t, i) => ({ ...t, index: i }))
      .filter((t) =>
        lang.t(t.nameKey).toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );
</script>

<div
  class="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors"
>
  <AppSidebar menuItems={dashboardMenuItems} menuLabel="Menu" />

  <!-- MAIN CONTENT (diberi jarak kiri selebar AppSidebar yang fixed, w-64) -->
  <div class="lg:pl-64">
    <div class="p-6 md:p-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold">Pilih Template Invoice</h1>
          <p class="text-sm opacity-60 mt-1">
            Temukan desain invoice yang cocok untuk bisnis kamu.
          </p>
        </div>

        <button
          onclick={() => theme.toggle()}
          class="text-lg"
          aria-label="Toggle dark mode"
        >
          {theme.dark ? "☀️" : "🌙"}
        </button>
      </div>

      <!-- SEARCH -->
      <div class="relative mb-4 max-w-md">
        <span
          class="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-sm"
          >🔍</span
        >
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Cari template..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] text-sm focus:outline-none focus:ring-2 transition"
          style="--tw-ring-color:#8CFF3D"
        />
      </div>

      <!-- CATEGORY FILTER (tampilan saja, template belum punya data kategori) -->
      <div class="flex flex-wrap gap-2 mb-8">
        {#each categories as cat}
          <button
            onclick={() => (activeCategory = cat)}
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition {activeCategory ===
            cat
              ? 'text-black'
              : 'bg-slate-100 dark:bg-white/5 opacity-70 hover:opacity-100'}"
            style={activeCategory === cat ? "background:#8CFF3D" : ""}
          >
            {cat}
          </button>
        {/each}
      </div>

      <!-- GRID TEMPLATE -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        {#each filteredTemplates as t (t.index)}
          <div
            class="rounded-2xl overflow-hidden bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 hover:border-[#8CFF3D] transition duration-300"
          >
            <div class="relative bg-slate-50 dark:bg-[#0d0d0d]">
              <span
                class="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black"
                style="background:#8CFF3D"
              >
                {String(t.index + 1).padStart(2, "0")}
              </span>

              <TemplatePreview component={t.component} />
            </div>

            <div class="p-3 space-y-2">
              <p class="font-semibold text-sm truncate">
                {lang.t(t.nameKey)}
              </p>

              <button
                onclick={() => useTemplate(t.index)}
                class="w-full text-xs font-semibold text-black py-2 rounded-full transition hover:opacity-90"
                style="background:#8CFF3D"
              >
                Gunakan Template →
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if filteredTemplates.length === 0}
        <p class="text-center opacity-50 text-sm py-16">
          Template tidak ditemukan.
        </p>
      {/if}
    </div>
  </div>
</div>
