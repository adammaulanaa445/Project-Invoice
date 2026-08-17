<script>
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';

  const templates = [
    { nameKey: 'tpl1_name', descKey: 'tpl1_desc', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' },
    { nameKey: 'tpl2_name', descKey: 'tpl2_desc', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
    { nameKey: 'tpl3_name', descKey: 'tpl3_desc', color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300' },
    { nameKey: 'tpl4_name', descKey: 'tpl4_desc', color: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300' },
    { nameKey: 'tpl5_name', descKey: 'tpl5_desc', color: 'bg-slate-800 text-emerald-400' },
    { nameKey: 'tpl6_name', descKey: 'tpl6_desc', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300' },
    { nameKey: 'tpl7_name', descKey: 'tpl7_desc', color: 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300' },
    { nameKey: 'tpl8_name', descKey: 'tpl8_desc', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
    { nameKey: 'tpl9_name', descKey: 'tpl9_desc', color: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
    { nameKey: 'tpl10_name', descKey: 'tpl10_desc', color: 'bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-300' },
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
      <a href="/templates" class="text-blue-600 dark:text-blue-400 font-medium">{lang.t('nav_templates')}</a>
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

  <div class="max-w-6xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">{lang.t('tp_title')}</h1>
    <p class="text-center text-slate-500 dark:text-slate-400 mb-10">{lang.t('tp_subtitle')}</p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {#each templates as t, i}
        <button
          onclick={() => useTemplate(i)}
          class="group text-left rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-blue-400 transition"
        >
          <div class="aspect-[3/4] flex items-center justify-center {t.color}">
            <span class="font-bold text-lg">{i + 1}</span>
          </div>
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