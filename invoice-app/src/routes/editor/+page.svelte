<script>
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
  import { page } from '$app/state';
  import { theme } from '$lib/theme.svelte.js';

  const templates = [
    { name: '1. Neat Minimal', component: Invoice01Neat },
    { name: '2. Classic Corporate', component: Invoice02Corporate },
    { name: '3. Bold Band', component: Invoice03BoldBand },
    { name: '4. Modern Gradient', component: Invoice04Gradient },
    { name: '5. Dark Studio', component: Invoice05DarkStudio },
    { name: '6. Elegant Luxury', component: Invoice06Luxury },
    { name: '7. Creative Asymmetric', component: Invoice07Asymmetric },
    { name: '8. Nature Eco', component: Invoice08NatureEco },
    { name: '9. Tech Startup', component: Invoice09TechStartup },
    { name: '10. Freelance', component: Invoice10Freelance },
  ];

  let selected = $state(Number(page.url.searchParams.get('template')) || 0);

  // Data invoice yang bisa diedit lewat form
  let invoice = $state({
    invoiceNumber: 'INV-0001',
    issueDate: '2026-08-14',
    dueDate: '2026-08-28',
    currency: 'IDR',
    logoUrl: '',
    from: { name: 'PT Contoh Jaya', address: 'Jl. Merdeka No.1, Surabaya', email: 'hello@contoh.co', phone: '08123456789' },
    to: { name: 'Budi Santoso', address: 'Jl. Sudirman No.5, Jakarta', email: 'budi@klien.com' },
    items: [
      { description: 'Jasa Desain Logo', qty: 1, price: 1500000 },
      { description: 'Jasa Maintenance Website', qty: 2, price: 500000 }
    ],
    taxPercent: 11,
    discountPercent: 0,
    notes: 'Pembayaran via transfer BCA 1234567890 a.n PT Contoh Jaya',
    status: 'unpaid'
  });

  function addItem() {
    invoice.items.push({ description: '', qty: 1, price: 0 });
    invoice.items = invoice.items; // trigger reactivity
  }

  function removeItem(index) {
    invoice.items = invoice.items.filter((_, i) => i !== index);
  }
</script>

<main class="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">

  <!-- NAVBAR -->
  <nav class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex justify-between items-center">
    <a href="/" class="font-bold text-xl text-slate-900 dark:text-white">InvoiceKita</a>
    <div class="flex gap-4 items-center text-sm">
      <a href="/templates" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Templates</a>
      <button onclick={() => theme.toggle()} class="text-lg" aria-label="Toggle dark mode">
        {theme.dark ? '☀️' : '🌙'}
      </button>
    </div>
  </nav>

  <div class="py-8 px-4">
    <h1 class="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">Buat Invoice</h1>

    <div class="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
      {#each templates as t, i}
        <button
          class="px-3 py-1.5 rounded-full text-sm border {selected === i ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'}"
          onclick={() => selected = i}
        >
          {t.name}
        </button>
      {/each}
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- FORM INPUT -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 space-y-5 h-fit">
        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">Info Dasar</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">No. Invoice</label>
              <input bind:value={invoice.invoiceNumber} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">Status</label>
              <select bind:value={invoice.status} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1">
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">Tanggal Terbit</label>
              <input type="date" bind:value={invoice.issueDate} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">Jatuh Tempo</label>
              <input type="date" bind:value={invoice.dueDate} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">Dari (Perusahaan Kamu)</h2>
          <div class="space-y-2">
            <input placeholder="Nama perusahaan" bind:value={invoice.from.name} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder="Alamat" bind:value={invoice.from.address} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <div class="grid grid-cols-2 gap-2">
              <input placeholder="Email" bind:value={invoice.from.email} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
              <input placeholder="Telepon" bind:value={invoice.from.phone} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">Kepada (Klien)</h2>
          <div class="space-y-2">
            <input placeholder="Nama klien" bind:value={invoice.to.name} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder="Alamat" bind:value={invoice.to.address} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder="Email" bind:value={invoice.to.email} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-slate-800 dark:text-white">Item</h2>
            <button onclick={addItem} class="text-xs px-2 py-1 bg-slate-900 dark:bg-blue-600 text-white rounded-lg">+ Tambah Item</button>
          </div>
          <div class="space-y-2">
            {#each invoice.items as item, i}
              <div class="flex gap-2 items-center">
                <input placeholder="Deskripsi" bind:value={item.description} class="flex-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
                <input type="number" placeholder="Qty" bind:value={item.qty} class="w-16 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1.5 text-sm" />
                <input type="number" placeholder="Harga" bind:value={item.price} class="w-28 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1.5 text-sm" />
                <button onclick={() => removeItem(i)} class="text-red-500 text-sm px-2">✕</button>
              </div>
            {/each}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-slate-500 dark:text-slate-400">Pajak (%)</label>
            <input type="number" bind:value={invoice.taxPercent} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
          </div>
          <div>
            <label class="text-xs text-slate-500 dark:text-slate-400">Diskon (%)</label>
            <input type="number" bind:value={invoice.discountPercent} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
          </div>
        </div>

        <div>
          <label class="text-xs text-slate-500 dark:text-slate-400">Catatan</label>
          <textarea bind:value={invoice.notes} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" rows="2"></textarea>
        </div>
      </div>

      <!-- PREVIEW LIVE -->
      <div class="lg:sticky lg:top-6 h-fit">
        <svelte:component this={templates[selected].component} {invoice} />
      </div>

    </div>
  </div>
</main>