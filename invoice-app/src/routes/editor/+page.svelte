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
  import { page } from '$app/state';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';
  import { goto } from '$app/navigation';

  const templates = [
    { name: () => `1. ${lang.t('tpl1_name')}`, component: Invoice01Neat },
    { name: () => `2. ${lang.t('tpl2_name')}`, component: Invoice02Corporate },
    { name: () => `3. ${lang.t('tpl3_name')}`, component: Invoice03BoldBand },
    { name: () => `4. ${lang.t('tpl4_name')}`, component: Invoice04Gradient },
    { name: () => `5. ${lang.t('tpl5_name')}`, component: Invoice05DarkStudio },
    { name: () => `6. ${lang.t('tpl6_name')}`, component: Invoice06Luxury },
    { name: () => `7. ${lang.t('tpl7_name')}`, component: Invoice07Asymmetric },
    { name: () => `8. ${lang.t('tpl8_name')}`, component: Invoice08NatureEco },
    { name: () => `9. ${lang.t('tpl9_name')}`, component: Invoice09TechStartup },
    { name: () => `10. ${lang.t('tpl10_name')}`, component: Invoice10Freelance },
    { name: () => `11. ${lang.t('tpl11_name')}`, component: InvoiceBoldTypography },
    { name: () => `12. ${lang.t('tpl12_name')}`, component: InvoiceDarkTech },
    { name: () => `13. ${lang.t('tpl13_name')}`, component: InvoiceEditorialKoran },
    { name: () => `14. ${lang.t('tpl14_name')}`, component: InvoiceEleganEmas },
    { name: () => `15. ${lang.t('tpl15_name')}`, component: InvoiceGradientVibrant },
    { name: () => `16. ${lang.t('tpl16_name')}`, component: InvoiceKlasikFormal },
    { name: () => `17. ${lang.t('tpl17_name')}`, component: InvoiceKorporatBiru },
    { name: () => `18. ${lang.t('tpl18_name')}`, component: InvoiceModernMinimalis },
    { name: () => `19. ${lang.t('tpl19_name')}`, component: InvoiceNordicEarthy },
    { name: () => `20. ${lang.t('tpl20_name')}`, component: InvoicePastelPlayful },
    { name: () => `21. ${lang.t('tpl21_name')}`, component: InvoiceRetroVintage },
    { name: () => `22. ${lang.t('tpl22_name')}`, component: InvoiceTechSaaS },
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

  let logoError = $state('');

  function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    logoError = '';

    // Validasi: harus gambar, maksimal 2MB
    if (!file.type.startsWith('image/')) {
      logoError = 'File harus berupa gambar (PNG/JPG/SVG).';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      logoError = 'Ukuran gambar maksimal 2MB.';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      invoice.logoUrl = event.target.result; // base64 data URL
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    invoice.logoUrl = '';
  }

  function addItem() {
    invoice.items.push({ description: '', qty: 1, price: 0 });
    invoice.items = invoice.items; // trigger reactivity
  }

  function removeItem(index) {
    invoice.items = invoice.items.filter((_, i) => i !== index);
  }

  let previewEl = $state();
  let downloading = $state(false);

  async function downloadPDF() {
    downloading = true;
    const { default: html2canvas } = await import('html2canvas-pro');
    const { jsPDF } = await import('jspdf');

    const canvas = await html2canvas(previewEl, { scale: 2 });
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, imgHeight);
    pdf.save(`${invoice.invoiceNumber || 'invoice'}.pdf`);

    downloading = false;
  }

  let saving = $state(false);
  let saveMessage = $state('');

  async function saveInvoice() {
    saving = true;
    saveMessage = '';

    const token = localStorage.getItem('auth_token');

    if (!token) {
      saveMessage = '❌ Silakan login terlebih dahulu.';
      saving = false;
      return;
    }

    try {
      const payload = {
        template_id: selected + 1,
        issue_date: invoice.issueDate,
        due_date: invoice.dueDate,
        currency: invoice.currency,
        from_name: invoice.from.name,
        from_address: invoice.from.address,
        from_email: invoice.from.email,
        from_phone: invoice.from.phone,
        logo_url: invoice.logoUrl || null,
        to_name: invoice.to.name,
        to_address: invoice.to.address,
        to_email: invoice.to.email,
        tax_percent: invoice.taxPercent,
        discount_percent: invoice.discountPercent,
        notes: invoice.notes,
        status: invoice.status,
        items: invoice.items.map((i) => ({
          description: i.description,
          qty: i.qty,
          price: i.price
        }))
      };

      const res = await fetch('http://localhost:8800/api/invoices', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Gagal menyimpan');
      }

      const data = await res.json();
      invoice.invoiceNumber = data.invoice_number;
      saveMessage = '✅ Invoice berhasil disimpan!';
    } catch (e) {
      saveMessage = '❌ Gagal menyimpan: ' + e.message;
    } finally {
      saving = false;
      setTimeout(() => (saveMessage = ''), 4000);
    }
  }

  // Fungsi Logout
  async function handleLogout() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      await fetch('http://localhost:8800/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    }

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    goto('/login');
  }
</script>

<main class="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">

  <!-- NAVBAR -->
  <nav class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex justify-between items-center">
    <a href="/" class="font-bold text-xl text-slate-900 dark:text-white">InvoiceKita</a>
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
        onclick={handleLogout} 
        class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg"
      >
        Logout
      </button>
    </div>
  </nav>

  <div class="py-8 px-4">
    <h1 class="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">{lang.t('et_title')}</h1>

    <div class="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
      {#each templates as t, i}
        <button
          class="px-3 py-1.5 rounded-full text-sm border {selected === i ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'}"
          onclick={() => selected = i}
        >
          {t.name()}
        </button>
      {/each}
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- FORM INPUT -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 space-y-5 h-fit">

        <!-- LOGO UPLOAD -->
        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">Logo Perusahaan</h2>
          <div class="flex items-center gap-4">
            {#if invoice.logoUrl}
              <img src={invoice.logoUrl} alt="Logo preview" class="w-16 h-16 object-contain rounded-lg border border-slate-200 dark:border-slate-600 bg-white p-1" />
            {:else}
              <div class="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 text-xs text-center">
                Belum ada logo
              </div>
            {/if}
            <div class="flex-1">
              <input
                type="file"
                accept="image/*"
                onchange={handleLogoUpload}
                class="w-full text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 dark:file:bg-blue-600 file:text-white file:text-xs"
              />
              {#if invoice.logoUrl}
                <button onclick={removeLogo} class="text-xs text-red-500 mt-1 hover:underline">Hapus logo</button>
              {/if}
              {#if logoError}
                <p class="text-xs text-red-500 mt-1">{logoError}</p>
              {/if}
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">{lang.t('et_info')}</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_invoice_number')}</label>
              <input bind:value={invoice.invoiceNumber} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_status')}</label>
              <select bind:value={invoice.status} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1">
                <option value="unpaid">{lang.t('et_status_unpaid')}</option>
                <option value="paid">{lang.t('et_status_paid')}</option>
                <option value="overdue">{lang.t('et_status_overdue')}</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_issue_date')}</label>
              <input type="date" bind:value={invoice.issueDate} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_due_date')}</label>
              <input type="date" bind:value={invoice.dueDate} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">{lang.t('et_from')}</h2>
          <div class="space-y-2">
            <input placeholder={lang.t('et_company_name')} bind:value={invoice.from.name} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder={lang.t('et_address')} bind:value={invoice.from.address} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <div class="grid grid-cols-2 gap-2">
              <input placeholder={lang.t('et_email')} bind:value={invoice.from.email} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
              <input placeholder={lang.t('et_phone')} bind:value={invoice.from.phone} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-white mb-3">{lang.t('et_to')}</h2>
          <div class="space-y-2">
            <input placeholder={lang.t('et_client_name')} bind:value={invoice.to.name} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder={lang.t('et_address')} bind:value={invoice.to.address} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
            <input placeholder={lang.t('et_email')} bind:value={invoice.to.email} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-slate-800 dark:text-white">{lang.t('et_items')}</h2>
            <button onclick={addItem} class="text-xs px-2 py-1 bg-slate-900 dark:bg-blue-600 text-white rounded-lg">{lang.t('et_add_item')}</button>
          </div>
          <div class="space-y-2">
            {#each invoice.items as item, i}
              <div class="flex gap-2 items-center">
                <input placeholder={lang.t('et_description')} bind:value={item.description} class="flex-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm" />
                <input type="number" placeholder={lang.t('et_qty')} bind:value={item.qty} class="w-16 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1.5 text-sm" />
                <input type="number" placeholder={lang.t('et_price')} bind:value={item.price} class="w-28 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1.5 text-sm" />
                <button onclick={() => removeItem(i)} class="text-red-500 text-sm px-2">✕</button>
              </div>
            {/each}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_tax')}</label>
            <input type="number" bind:value={invoice.taxPercent} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
          </div>
          <div>
            <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_discount')}</label>
            <input type="number" bind:value={invoice.discountPercent} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" />
          </div>
        </div>

        <div>
          <label class="text-xs text-slate-500 dark:text-slate-400">{lang.t('et_notes')}</label>
          <textarea bind:value={invoice.notes} class="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-1.5 text-sm mt-1" rows="2"></textarea>
        </div>
      </div>

      <!-- PREVIEW LIVE -->
      <div class="lg:sticky lg:top-6 h-fit">
        <div class="flex gap-2 mb-3">
          <button
            onclick={saveInvoice}
            disabled={saving}
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Invoice'}
          </button>
          <button
            onclick={downloadPDF}
            disabled={downloading}
            class="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
          >
            {downloading ? 'Membuat PDF...' : '📄 Download PDF'}
          </button>
        </div>
        {#if saveMessage}
          <p class="text-center text-sm mb-3 {saveMessage.startsWith('✅') ? 'text-emerald-600' : 'text-red-500'}">{saveMessage}</p>
        {/if}
        <div bind:this={previewEl}>
          <svelte:component this={templates[selected].component} {invoice} />
        </div>
      </div>
    </div>
  </div>
</main>