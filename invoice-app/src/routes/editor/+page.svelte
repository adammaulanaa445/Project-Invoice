<script>
  import { onMount } from 'svelte';

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
  import Invoice33DarkWave from '$lib/components/invoices/Invoice33DarkWave.svelte';
  import Invoice34ModernBlue from '$lib/components/invoices/Invoice34ModernBlue.svelte';
  import Invoice35ElegantPurple from '$lib/components/invoices/Invoice35ElegantPurple.svelte';

  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';
  import { invoiceStore } from '$lib/invoiceStore.svelte.js';

  // =====================================================
  // API
  // =====================================================

  const API_BASE = 'http://localhost:8800/api';
  const STORAGE_BASE = 'http://localhost:8800/storage';

  // =====================================================
  // TEMPLATE
  // =====================================================

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
    { name: () => `23. ${lang.t('tpl23_name')}`, component: InvoiceCurvedTeal },
    { name: () => `24. ${lang.t('tpl24_name')}`, component: InvoicePixelReceipt },
    { name: () => `25. ${lang.t('tpl25_name')}`, component: InvoiceLedgerKlasik },
    { name: () => `26. ${lang.t('tpl26_name')}`, component: InvoiceSwissGrid },
    { name: () => `27. ${lang.t('tpl27_name')}`, component: InvoiceMotifWarm },
    { name: () => `28. ${lang.t('tpl28_name')}`, component: InvoiceMinimalisMono },
    { name: () => `29. ${lang.t('tpl29_name')}`, component: InvoiceStudioHitam },
    { name: () => `30. ${lang.t('tpl30_name')}`, component: InvoiceBrutalistBracket },
   { name: () => `31. ${lang.t('tpl31_name')}`, component: InvoiceEditorialMerah },
    { name: () => `32. ${lang.t('tpl32_name')}`, component: InvoiceSidebarBiru },
    { name: () => `33. Dark Wave`, component: Invoice33DarkWave },
    { name: () => `34. Modern Blue`, component: Invoice34ModernBlue },
    { name: () => `35. Elegant Purple`, component: Invoice35ElegantPurple }
  ];

  let selected = $state(
    Number(page.url.searchParams.get('template')) || 0
  );

  // =====================================================
  // INVOICE DATA
  // =====================================================

  let invoice = $state({
    invoiceNumber: 'INV-0001',
    issueDate: '2026-08-14',
    dueDate: '2026-08-28',
    currency: 'IDR',
    logoUrl: '',

    from: {
      name: 'PT Contoh Jaya',
      address: 'Jl. Merdeka No.1, Surabaya',
      email: 'hello@contoh.co',
      phone: '08123456789'
    },

    to: {
      name: 'Budi Santoso',
      address: 'Jl. Sudirman No.5, Jakarta',
      email: 'budi@klien.com'
    },

    items: [
      {
        description: 'Jasa Desain Logo',
        qty: 1,
        price: 1500000
      },
      {
        description: 'Jasa Maintenance Website',
        qty: 2,
        price: 500000
      }
    ],

    taxPercent: 11,
    discountPercent: 0,

    notes:
      'Pembayaran via transfer BCA 1234567890 a.n PT Contoh Jaya',

    status: 'unpaid'
  });

  let logoError = $state('');
  let previewEl = $state();

  let downloading = $state(false);
  let saving = $state(false);

  let saveMessage = $state('');

  // Email
  let sendingEmail = $state(false);
  let showEmailModal = $state(false);
  let emailMessage = $state('');
  let recipientEmail = $state('');

  // ID invoice yang sudah tersimpan di database
  let savedInvoiceId = $state(null);

  // =====================================================
  // LOAD COMPANY PROFILE
  // =====================================================

  async function loadCompanyProfile() {
    try {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        goto('/login');
        return;
      }

      const response = await fetch(
        `${API_BASE}/company-profile`,
        {
          method: 'GET',

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );

      // =================================================
      // TOKEN EXPIRED / UNAUTHORIZED
      // =================================================

      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');

        goto('/login');

        return;
      }

      if (!response.ok) {
        throw new Error(
          'Gagal mengambil profile perusahaan.'
        );
      }

      const profile = await response.json();

      // =================================================
      // DATA PERUSAHAAN
      // =================================================

      if (profile.company_name) {
        invoice.from.name = profile.company_name;
      }

      if (profile.address) {
        invoice.from.address = profile.address;
      }

      if (profile.email) {
        invoice.from.email = profile.email;
      }

      if (profile.phone) {
        invoice.from.phone = profile.phone;
      }

      // =================================================
      // LOGO PERUSAHAAN
      // =================================================

      if (profile.logo_path) {
        invoice.logoUrl =
          `${STORAGE_BASE}/${profile.logo_path}`;
      }

    } catch (error) {
      console.error(
        'Load company profile error:',
        error
      );
    }
  }

  // =====================================================
  // ON MOUNT
  // =====================================================

  onMount(async () => {
    lang.init();

    await loadCompanyProfile();
  });

  // =====================================================
  // LOGO UPLOAD
  // =====================================================

  function handleLogoUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    logoError = '';

    if (!file.type.startsWith('image/')) {
      logoError = lang.t('logo_file_error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      logoError = lang.t('logo_size_error');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      invoice.logoUrl = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  // =====================================================
  // REMOVE LOGO
  // =====================================================

  function removeLogo() {
    invoice.logoUrl = '';
  }

  // =====================================================
  // ADD ITEM
  // =====================================================

  function addItem() {
    invoice.items.push({
      description: '',
      qty: 1,
      price: 0
    });

    invoice.items = invoice.items;
  }

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  function removeItem(index) {
    invoice.items = invoice.items.filter(
      (_, i) => i !== index
    );
  }

  // =====================================================
  // GENERATE PDF
  // =====================================================

  async function generatePDF() {
    if (!previewEl) {
      throw new Error(
        'Preview invoice tidak ditemukan.'
      );
    }

    const { default: html2canvas } =
      await import('html2canvas-pro');

    const { jsPDF } =
      await import('jspdf');

    const canvas =
      await html2canvas(
        previewEl,
        {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        }
      );

    const imgData =
      canvas.toDataURL(
        'image/jpeg',
        0.98
      );

    const pdf =
      new jsPDF(
        'p',
        'mm',
        'a4'
      );

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const imgHeight =
      (canvas.height * pageWidth) /
      canvas.width;

    // =================================================
    // 1 PAGE
    // =================================================

    if (imgHeight <= pageHeight) {
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        pageWidth,
        imgHeight
      );
    }

    // =================================================
    // MULTI PAGE
    // =================================================

    else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        imgData,
        'JPEG',
        0,
        position,
        pageWidth,
        imgHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          'JPEG',
          0,
          position,
          pageWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
      }
    }

    return pdf;
  }

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  async function downloadPDF() {
    downloading = true;

    try {
      const pdf =
        await generatePDF();

      pdf.save(
        `${invoice.invoiceNumber || 'invoice'}.pdf`
      );

    } catch (error) {
      console.error(
        'Generate PDF error:',
        error
      );

      saveMessage =
        '❌ Gagal membuat PDF.';

      setTimeout(() => {
        saveMessage = '';
      }, 4000);

    } finally {
      downloading = false;
    }
  }

  // =====================================================
  // SAVE INVOICE
  // =====================================================

  async function saveInvoice() {
    saving = true;
    saveMessage = '';

    try {
      const record =
        await invoiceStore.save(
          selected + 1,
          invoice
        );

      savedInvoiceId = record.id;

      if (record.invoiceNumber) {
        invoice.invoiceNumber =
          record.invoiceNumber;
      }

      saveMessage =
        '✅ Invoice berhasil disimpan!';

    } catch (e) {
      console.error(
        'Save invoice error:',
        e
      );

      saveMessage =
        '❌ Gagal menyimpan: ' +
        (e.message || 'Terjadi kesalahan.');

    } finally {
      saving = false;

      setTimeout(() => {
        saveMessage = '';
      }, 4000);
    }
  }

  // =====================================================
  // OPEN EMAIL MODAL
  // =====================================================

  function openEmailModal() {
    recipientEmail =
      invoice.to.email || '';

    emailMessage = '';

    showEmailModal = true;
  }

  // =====================================================
  // SEND EMAIL
  // =====================================================

  async function sendEmail() {
    if (!recipientEmail.trim()) {
      emailMessage =
        '❌ Masukkan email penerima.';

      return;
    }

    sendingEmail = true;
    emailMessage = '';

    try {
      const token =
        localStorage.getItem(
          'auth_token'
        );

      if (!token) {
        throw new Error(
          'Kamu harus login terlebih dahulu.'
        );
      }

      // =================================================
      // JIKA BELUM DISIMPAN
      // =================================================

      if (!savedInvoiceId) {
        const record =
          await invoiceStore.save(
            selected + 1,
            invoice
          );

        savedInvoiceId =
          record.id;

        if (record.invoiceNumber) {
          invoice.invoiceNumber =
            record.invoiceNumber;
        }
      }

      // =================================================
      // GENERATE PDF
      // =================================================

      const pdf =
        await generatePDF();

      const pdfBlob =
        pdf.output('blob');

      // =================================================
      // FORM DATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        'email',
        recipientEmail.trim()
      );

      formData.append(
        'pdf',
        pdfBlob,
        `Invoice-${invoice.invoiceNumber || 'invoice'}.pdf`
      );

      // =================================================
      // REQUEST KE LARAVEL
      // =================================================

      const response =
        await fetch(
          `${API_BASE}/invoices/${savedInvoiceId}/send-email`,
          {
            method: 'POST',

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                'application/json'
            },

            body: formData
          }
        );

      let result = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      // =================================================
      // TOKEN EXPIRED
      // =================================================

      if (response.status === 401) {
        localStorage.removeItem(
          'auth_token'
        );

        localStorage.removeItem(
          'user'
        );

        goto('/login');

        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
          'Gagal mengirim email.'
        );
      }

      emailMessage =
        '✅ Invoice berhasil dikirim!';

      // =================================================
      // CLOSE MODAL
      // =================================================

      setTimeout(() => {
        showEmailModal = false;
        emailMessage = '';
      }, 2500);

    } catch (error) {
      console.error(
        'Send email error:',
        error
      );

      emailMessage =
        '❌ ' +
        (
          error.message ||
          'Gagal mengirim email.'
        );

    } finally {
      sendingEmail = false;
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  async function handleLogout() {
    const token =
      localStorage.getItem(
        'auth_token'
      );

    if (token) {
      try {
        await fetch(
          `${API_BASE}/logout`,
          {
            method: 'POST',

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                'application/json'
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    localStorage.removeItem(
      'auth_token'
    );

    localStorage.removeItem(
      'user'
    );

    goto('/login');
  }
</script>

<main
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors"
>
  <!-- NAVBAR -->

  <nav
    class="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-black px-6 py-4 flex justify-between items-center"
  >
    <a
      href="/"
      class="flex items-center gap-2 font-bold text-lg"
    >
      <span
        class="w-3 h-3 rounded-full"
        style="background:#8CFF3D"
      ></span>

      InvoiceKita
    </a>

    <div
      class="flex gap-4 items-center text-sm"
    >
      <a
        href="/templates"
        class="opacity-70 hover:opacity-100 transition"
      >
        {lang.t('nav_templates')}
      </a>

      <select
        value={lang.current}
        onchange={(e) =>
          lang.set(e.target.value)}
        class="bg-transparent text-sm border border-slate-300 dark:border-white/20 rounded-lg px-2 py-1"
      >
        {#each Object.entries(lang.options) as [code, label]}
          <option
            value={code}
            class="text-slate-900"
          >
            {label}
          </option>
        {/each}
      </select>

      <button
        onclick={() => theme.toggle()}
        class="text-lg"
        aria-label="Toggle dark mode"
      >
        {theme.dark ? '☀️' : '🌙'}
      </button>

      <button
        onclick={handleLogout}
        class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-full"
      >
        {lang.t('logout')}
      </button>
    </div>
  </nav>

  <!-- CONTENT -->

  <div class="py-8 px-4">

    <h1
      class="text-2xl font-bold text-center mb-6"
    >
      {lang.t('et_title')}
    </h1>

    <!-- TEMPLATE SELECTOR -->

    <div
      class="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto"
    >
      {#each templates as t, i}

        <button
          class="px-3 py-1.5 rounded-full text-sm border transition {selected === i
            ? ''
            : 'border-slate-300 dark:border-white/10 opacity-70'}"
          style={selected === i
            ? 'background:#8CFF3D; color:#000; border-color:#8CFF3D;'
            : ''}
          onclick={() =>
            selected = i}
        >
          {t.name()}
        </button>

      {/each}
    </div>

    <!-- MAIN GRID -->

    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
    >

      <!-- FORM -->

      <div
        class="bg-slate-50 dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 p-6 space-y-5 h-fit"
      >

        <!-- LOGO -->

        <div>
          <h2
            class="font-semibold mb-3"
          >
            {lang.t('logo_company')}
          </h2>

          <div
            class="flex items-center gap-4"
          >
            {#if invoice.logoUrl}

              <img
                src={invoice.logoUrl}
                alt={lang.t('logo_company')}
                class="w-16 h-16 object-contain rounded-lg border border-slate-200 dark:border-white/10 bg-white p-1"
              />

            {:else}

              <div
                class="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 dark:border-white/20 flex items-center justify-center opacity-50 text-xs text-center"
              >
                {lang.t('logo_empty')}
              </div>

            {/if}

            <div class="flex-1">

              <input
                type="file"
                accept="image/*"
                onchange={handleLogoUpload}
                class="w-full text-xs opacity-80 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:font-semibold file:text-black file:bg-[#8CFF3D] text-current"
              />

              {#if invoice.logoUrl}

                <button
                  onclick={removeLogo}
                  class="text-xs text-red-500 mt-1 hover:underline"
                >
                  {lang.t('logo_remove')}
                </button>

              {/if}

              {#if logoError}

                <p
                  class="text-xs text-red-500 mt-1"
                >
                  {logoError}
                </p>

              {/if}

            </div>
          </div>
        </div>

        <!-- INVOICE INFO -->

        <div>
          <h2
            class="font-semibold mb-3"
          >
            {lang.t('et_info')}
          </h2>

          <div
            class="grid grid-cols-2 gap-3"
          >

            <div>
              <label
                class="text-xs opacity-60"
              >
                {lang.t(
                  'et_invoice_number'
                )}
              </label>

              <input
                bind:value={invoice.invoiceNumber}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
              />
            </div>

            <div>
              <label
                class="text-xs opacity-60"
              >
                {lang.t('et_status')}
              </label>

              <select
                bind:value={invoice.status}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
              >
                <option value="unpaid">
                  {lang.t(
                    'et_status_unpaid'
                  )}
                </option>

                <option value="paid">
                  {lang.t(
                    'et_status_paid'
                  )}
                </option>

                <option value="overdue">
                  {lang.t(
                    'et_status_overdue'
                  )}
                </option>
              </select>
            </div>

            <div>
              <label
                class="text-xs opacity-60"
              >
                {lang.t(
                  'et_issue_date'
                )}
              </label>

              <input
                type="date"
                bind:value={invoice.issueDate}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
              />
            </div>

            <div>
              <label
                class="text-xs opacity-60"
              >
                {lang.t(
                  'et_due_date'
                )}
              </label>

              <input
                type="date"
                bind:value={invoice.dueDate}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
              />
            </div>

          </div>
        </div>

        <!-- FROM -->

        <div>
          <h2
            class="font-semibold mb-3"
          >
            {lang.t('et_from')}
          </h2>

          <div class="space-y-2">

            <input
              placeholder={lang.t(
                'et_company_name'
              )}
              bind:value={invoice.from.name}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

            <input
              placeholder={lang.t(
                'et_address'
              )}
              bind:value={invoice.from.address}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

            <div
              class="grid grid-cols-2 gap-2"
            >

              <input
                placeholder={lang.t(
                  'et_email'
                )}
                bind:value={invoice.from.email}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
              />

              <input
                placeholder={lang.t(
                  'et_phone'
                )}
                bind:value={invoice.from.phone}
                class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
              />

            </div>
          </div>
        </div>

        <!-- TO -->

        <div>
          <h2
            class="font-semibold mb-3"
          >
            {lang.t('et_to')}
          </h2>

          <div class="space-y-2">

            <input
              placeholder={lang.t(
                'et_client_name'
              )}
              bind:value={invoice.to.name}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

            <input
              placeholder={lang.t(
                'et_address'
              )}
              bind:value={invoice.to.address}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

            <input
              type="email"
              placeholder={lang.t(
                'et_email'
              )}
              bind:value={invoice.to.email}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
            />

          </div>
        </div>

        <!-- ITEMS -->

        <div>

          <div
            class="flex justify-between items-center mb-3"
          >

            <h2
              class="font-semibold"
            >
              {lang.t('et_items')}
            </h2>

            <button
              onclick={addItem}
              class="text-xs px-3 py-1.5 font-semibold text-black rounded-full"
              style="background:#8CFF3D"
            >
              {lang.t(
                'et_add_item'
              )}
            </button>

          </div>

          <div class="space-y-2">

            {#each invoice.items as item, i}

              <div
                class="flex gap-2 items-center"
              >

                <input
                  placeholder={lang.t(
                    'et_description'
                  )}
                  bind:value={item.description}
                  class="flex-1 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
                />

                <input
                  type="number"
                  placeholder={lang.t(
                    'et_qty'
                  )}
                  bind:value={item.qty}
                  class="w-16 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-2 py-1.5 text-sm"
                />

                <input
                  type="number"
                  placeholder={lang.t(
                    'et_price'
                  )}
                  bind:value={item.price}
                  class="w-28 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-2 py-1.5 text-sm"
                />

                <button
                  onclick={() =>
                    removeItem(i)}
                  class="text-red-500 text-sm px-2"
                >
                  ✕
                </button>

              </div>

            {/each}

          </div>
        </div>

        <!-- TAX & DISCOUNT -->

        <div
          class="grid grid-cols-2 gap-3"
        >

          <div>
            <label
              class="text-xs opacity-60"
            >
              {lang.t('et_tax')}
            </label>

            <input
              type="number"
              bind:value={invoice.taxPercent}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
            />
          </div>

          <div>
            <label
              class="text-xs opacity-60"
            >
              {lang.t(
                'et_discount'
              )}
            </label>

            <input
              type="number"
              bind:value={invoice.discountPercent}
              class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
            />
          </div>

        </div>

        <!-- NOTES -->

        <div>

          <label
            class="text-xs opacity-60"
          >
            {lang.t('et_notes')}
          </label>

          <textarea
            bind:value={invoice.notes}
            class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm mt-1"
            rows="2"
          ></textarea>

        </div>

      </div>

      <!-- PREVIEW -->

      <div
        class="lg:sticky lg:top-6 h-fit"
      >

        <!-- ACTION BUTTONS -->

        <div class="flex gap-2 mb-3">

          <!-- SAVE -->

          <button
            onclick={saveInvoice}
            disabled={saving || sendingEmail}
            class="flex-1 text-black px-4 py-2 rounded-full font-semibold disabled:opacity-50"
            style="background:#8CFF3D"
          >
            {saving
              ? lang.t(
                  'saving_invoice'
                )
              : lang.t(
                  'save_invoice'
                )}
          </button>

          <!-- DOWNLOAD -->

          <button
            onclick={downloadPDF}
            disabled={
              downloading ||
              sendingEmail
            }
            class="flex-1 px-4 py-2 rounded-full font-semibold border-2 disabled:opacity-50"
            style="border-color:#8CFF3D; color:#8CFF3D;"
          >
            {downloading
              ? lang.t(
                  'generating_pdf'
                )
              : lang.t(
                  'download_pdf'
                )}
          </button>

        </div>

        <!-- EMAIL BUTTON -->

        <div class="mb-3">

          <button
            onclick={openEmailModal}
            disabled={
              saving ||
              downloading ||
              sendingEmail
            }
            class="w-full px-4 py-2 rounded-full font-semibold border-2 disabled:opacity-50 transition"
            style="border-color:#8CFF3D; color:#8CFF3D;"
          >
            📧 Kirim Email
          </button>

        </div>

        <!-- SAVE MESSAGE -->

        {#if saveMessage}

          <p
            class="text-center text-sm mb-3 {saveMessage.startsWith(
              '✅'
            )
              ? 'text-emerald-500'
              : 'text-red-500'}"
          >
            {saveMessage}
          </p>

        {/if}

        <!-- PREVIEW -->

        <div
          bind:this={previewEl}
          class="rounded-2xl overflow-hidden"
        >

          <svelte:component
            this={
              templates[selected]
                .component
            }
            {invoice}
          />

        </div>

      </div>

    </div>
  </div>

  <!-- ================================================= -->
  <!-- EMAIL MODAL -->
  <!-- ================================================= -->

  {#if showEmailModal}

    <div
      class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onclick={(e) => {
        if (
          e.target ===
            e.currentTarget &&
          !sendingEmail
        ) {
          showEmailModal = false;
          emailMessage = '';
        }
      }}
    >

      <div
        class="w-full max-w-md bg-white dark:bg-[#111] text-slate-900 dark:text-white rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-white/10"
      >

        <!-- TITLE -->

        <div
          class="flex items-center justify-between mb-2"
        >

          <h2
            class="text-xl font-bold"
          >
            📧 Kirim Invoice
          </h2>

          <button
            onclick={() => {
              if (!sendingEmail) {
                showEmailModal = false;
                emailMessage = '';
              }
            }}
            disabled={sendingEmail}
            class="text-xl opacity-60 hover:opacity-100 disabled:opacity-30"
          >
            ✕
          </button>

        </div>

        <p
          class="text-sm opacity-60 mb-5"
        >
          Masukkan email pelanggan
          untuk mengirim invoice.
        </p>

        <!-- EMAIL -->

        <label
          class="text-sm font-medium"
          for="recipient-email"
        >
          Email penerima
        </label>

        <input
          id="recipient-email"
          type="email"
          bind:value={recipientEmail}
          placeholder="contoh@email.com"
          class="w-full mt-2 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8CFF3D]"
          disabled={sendingEmail}
          onkeydown={(e) => {
            if (
              e.key === 'Enter' &&
              !sendingEmail
            ) {
              sendEmail();
            }
          }}
        />

        <!-- MESSAGE -->

        {#if emailMessage}

          <p
            class="text-sm mt-3 {emailMessage.startsWith(
              '✅'
            )
              ? 'text-emerald-500'
              : 'text-red-500'}"
          >
            {emailMessage}
          </p>

        {/if}

        <!-- BUTTONS -->

        <div class="flex gap-2 mt-6">

          <button
            onclick={() => {
              showEmailModal = false;
              emailMessage = '';
            }}
            disabled={sendingEmail}
            class="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onclick={sendEmail}
            disabled={
              sendingEmail ||
              !recipientEmail.trim()
            }
            class="flex-1 px-4 py-2 rounded-full font-semibold text-black disabled:opacity-50"
            style="background:#8CFF3D"
          >
            {sendingEmail
              ? 'Mengirim...'
              : 'Kirim Invoice'}
          </button>

        </div>

      </div>

    </div>

  {/if}

</main>