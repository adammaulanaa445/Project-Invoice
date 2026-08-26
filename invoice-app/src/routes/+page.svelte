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

  const featuredTemplates = [
    { nameKey: 'tpl1_name', component: Invoice01Neat },
    { nameKey: 'tpl2_name', component: Invoice02Corporate },
    { nameKey: 'tpl3_name', component: Invoice03BoldBand },
    { nameKey: 'tpl4_name', component: Invoice04Gradient },
    { nameKey: 'tpl5_name', component: Invoice05DarkStudio },
    { nameKey: 'tpl6_name', component: Invoice06Luxury },
  ];
</script>

<main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">

  <!-- NAVBAR -->
  <nav class="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
    <span class="font-bold text-xl text-slate-900 dark:text-white">InvoiceKita</span>

    <div class="flex gap-4 items-center text-sm">
      <a href="/templates" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">{lang.t('nav_templates')}</a>
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
        class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
      >
        {lang.t('nav_create')}
      </button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
    <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
      {lang.t('hero_title')}
    </h1>
    <p class="text-lg text-slate-500 dark:text-slate-400 mb-8">
      {lang.t('hero_subtitle')}
    </p>
    <button
      onclick={() => goto('/editor')}
      class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700"
    >
      {lang.t('hero_cta')}
    </button>
  </section>

  <!-- TEMPLATE PREVIEW GRID -->
  <section class="max-w-6xl mx-auto px-6 pb-20">
    <h2 class="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">{lang.t('gallery_title')}</h2>
    <p class="text-center text-slate-500 dark:text-slate-400 mb-10">{lang.t('gallery_subtitle')}</p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each featuredTemplates as t}
        <button
          onclick={() => goto('/editor')}
          class="rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-lg transition overflow-hidden bg-white dark:bg-slate-800"
        >
          <TemplatePreview component={t.component} />
          <p class="font-semibold text-sm text-center py-3 text-slate-800 dark:text-white">{lang.t(t.nameKey)}</p>
        </button>
      {/each}
    </div>

    <div class="text-center mt-8">
      <a href="/templates" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">{lang.t('see_all')}</a>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="bg-slate-50 dark:bg-slate-800 py-20 px-6 transition-colors">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">1</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">{lang.t('f1_title')}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{lang.t('f1_desc')}</p>
      </div>
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">2</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">{lang.t('f2_title')}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{lang.t('f2_desc')}</p>
      </div>
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">3</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">{lang.t('f3_title')}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{lang.t('f3_desc')}</p>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="text-center py-10 text-sm text-slate-400 dark:text-slate-500">
    {lang.t('footer')}
  </footer>

</main>