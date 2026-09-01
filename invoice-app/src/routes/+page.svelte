<script>
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';
  import TemplatePreview from '$lib/components/TemplatePreview.svelte';

  import InvoiceBoldTypography from '$lib/components/invoices/InvoiceBoldTypography.svelte';
  import Invoice01Neat from '$lib/components/invoices/Invoice01Neat.svelte';
  import Invoice05DarkStudio from '$lib/components/invoices/Invoice05DarkStudio.svelte';

  const stats = [
    { value: '32+', label: 'Template' },
    { value: '10', label: 'Bahasa' },
    { value: '100%', label: 'Gratis' },
    { value: '24/7', label: 'Akses' },
  ];

  const services = [
    { titleKey: 'f1_title', descKey: 'f1_desc' },
    { titleKey: 'f2_title', descKey: 'f2_desc' },
    { titleKey: 'f3_title', descKey: 'f3_desc' },
    { titleKey: 'Cetak Via PDF', descKey: 'Cetak Via PDF' }
    
  ];
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
          <a href="/templates" class="opacity-70 hover:opacity-100 transition">{lang.t('nav_templates')}</a>
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
           <a href="/login"
            class="rounded-full px-4 py-2 font-semibold border border-current/30 hover:opacity-80 transition"
          >
            Login
          </a>
        </div>
      </nav>

      <!-- HERO CONTENT -->
      <div class="px-6 md:px-12 pb-14 pt-6 flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {lang.t('hero_title')}
          </h1>
          <p class="mt-4 opacity-70 max-w-md mx-auto md:mx-0">{lang.t('hero_subtitle')}</p>
          <div class="mt-8 flex gap-3 justify-center md:justify-start">
            <button
              onclick={() => goto('/editor')}
              class="rounded-full px-6 py-3 font-semibold text-black"
              style="background:#8CFF3D"
            >
              {lang.t('hero_cta')}
            </button>
            <a
              href="/templates"
              class="rounded-full px-6 py-3 font-semibold border border-current/30 cursor-pointer">
              {lang.t('see_all')}
            </a>
          </div>
        </div>
        <div class="w-full md:w-80 flex-shrink-0">
          <div class="rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5">
            <TemplatePreview component={InvoiceBoldTypography} />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <section class="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
    <div class="rounded-2xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 dark:divide-white/10 py-6">
      {#each stats as s}
        <div class="text-center px-2">
          <p class="text-2xl md:text-3xl font-bold" style="color:#8CFF3D">{s.value}</p>
          <p class="text-xs opacity-60 mt-1">{s.label}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- TURNING IDEAS: dua preview desain berdampingan -->
  <section class="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 class="text-3xl font-bold leading-tight">{lang.t('gallery_title')}</h2>
      <p class="mt-4 opacity-60">{lang.t('gallery_subtitle')}</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10">
        <TemplatePreview component={Invoice01Neat} />
        <span class="absolute bottom-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black" style="background:#8CFF3D">Neat Minimal</span>
      </div>
      <div class="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 mt-8">
        <TemplatePreview component={Invoice05DarkStudio} />
        <span class="absolute bottom-3 left-3 z-10 text-[10px] font-semibold uppercase px-2 py-1 rounded-full text-black" style="background:#8CFF3D">Dark Studio</span>
      </div>
    </div>
  </section>

  <!-- OUR SERVICES: list bernomor + panel samping -->
  <section class="bg-slate-50 dark:bg-[#0d0d0d] py-20 px-6 transition-colors">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-2">
        Our <span class="px-2 rounded-lg text-black" style="background:#8CFF3D">Services</span>
      </h2>
      <p class="opacity-60 mb-10 max-w-md">{lang.t('gallery_subtitle')}</p>

      <div class="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
        <div class="space-y-3">
          {#each services as s, i}
            <div class="flex items-center justify-between rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 px-5 py-4">
              <div class="flex items-center gap-4">
                <span class="font-bold text-sm" style="color:#8CFF3D">{String(i + 1).padStart(2, '0')}</span>
                <span class="font-semibold">{lang.t(s.titleKey)}</span>
              </div>
              <span class="opacity-40">→</span>
            </div>
          {/each}
        </div>
        <div class="grid grid-rows-2 gap-4">
          <div class="rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 p-5">
            <p class="text-sm opacity-70 mb-2">Penasaran cara kerjanya?</p>
            <a href="/templates" class="font-semibold flex items-center gap-1" style="color:#8CFF3D">Lihat Template <span>→</span></a>
          </div>
          <div class="rounded-xl p-5 text-black" style="background:#8CFF3D">
            <p class="text-sm mb-2 opacity-80">Siap membuat invoice pertamamu?</p>
            <button onclick={() => goto('/editor')} class="font-semibold flex items-center gap-1 cursor-pointer">{lang.t('hero_cta')} <span>→</span></button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TEKS BESAR PEMISAH -->
  <section class="py-16 text-center">
    <h2 class="text-3xl md:text-5xl font-black tracking-tight">
      Buat <span style="color:#8CFF3D">✦</span> Kirim <span style="color:#8CFF3D">✦</span> Dibayar
    </h2>
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
          class="rounded-full px-6 py-3 font-semibold bg-black text-white flex-shrink-0 cursor-pointer">
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
