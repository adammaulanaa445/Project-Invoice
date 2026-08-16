<script>
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';

  const featuredTemplates = [
    { name: '1. Neat Minimal', id: 0, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' },
    { name: '2. Classic Corporate', id: 1, color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
    { name: '3. Bold Band', id: 2, color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300' },
    { name: '4. Modern Gradient', id: 3, color: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300' },
    { name: '5. Dark Studio', id: 4, color: 'bg-slate-800 text-emerald-400' },
    { name: '6. Elegant Luxury', id: 5, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300' },
  ];
</script>

<main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">

  <!-- NAVBAR -->
  <nav class="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
    <span class="font-bold text-xl text-slate-900 dark:text-white">InvoiceKita</span>
    <div class="flex gap-4 items-center text-sm">
      <a href="/templates" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Templates</a>
      <button onclick={() => theme.toggle()} class="text-lg" aria-label="Toggle dark mode">
        {theme.dark ? '☀️' : '🌙'}
      </button>
      <button
        onclick={() => goto('/editor')}
        class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
      >
        Buat Invoice
      </button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
    <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
      100+ Template Invoice Gratis
    </h1>
    <p class="text-lg text-slate-500 dark:text-slate-400 mb-8">
      Buat invoice profesional dalam hitungan menit. Pilih desain, isi data, langsung kirim.
    </p>
    <button
      onclick={() => goto('/editor')}
      class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700"
    >
      Buat Invoice Sekarang!
    </button>
  </section>

  <!-- TEMPLATE PREVIEW GRID -->
  <section class="max-w-6xl mx-auto px-6 pb-20">
    <h2 class="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Pilih Desain Invoice Kamu</h2>
    <p class="text-center text-slate-500 dark:text-slate-400 mb-10">Mulai membuat invoice profesional dari sini!</p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each featuredTemplates as t}
        <button
          onclick={() => goto('/editor')}
          class="aspect-[3/4] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-lg transition flex flex-col items-center justify-center gap-2 {t.color}"
        >
          <span class="font-semibold">{t.name}</span>
        </button>
      {/each}
    </div>

    <div class="text-center mt-8">
      <a href="/templates" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Lihat Semua Template →</a>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="bg-slate-50 dark:bg-slate-800 py-20 px-6 transition-colors">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">1</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">Buat Invoice</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Pilih dari banyak template, tambahkan logo perusahaanmu.</p>
      </div>
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">2</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">Kirim via Email</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Kirim sebagai PDF langsung ke klien, atau cetak.</p>
      </div>
      <div>
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">3</div>
        <h3 class="font-semibold text-slate-800 dark:text-white mb-2">Terima Pembayaran</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Dapatkan pembayaran lebih cepat secara online.</p>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="text-center py-10 text-sm text-slate-400 dark:text-slate-500">
    Dibuat untuk tugas kelompok — InvoiceKita 2026
  </footer>

</main>