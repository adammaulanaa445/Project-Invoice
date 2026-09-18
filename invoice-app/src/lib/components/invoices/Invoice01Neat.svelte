<script>
  // === Invoice #1: "Neat Minimal" ===
  // Palette: white bg, near-black text, single blue accent (#2563EB)
  // Type: Inter (sans), clean left-aligned header, thin dividers

  let {
    invoice = {
      invoiceNumber: "INV-0001",
      issueDate: "2026-08-14",
      dueDate: "2026-08-28",
      currency: "IDR",
      logoUrl: "",

      from: {
        name: "PT Contoh Jaya",
        address: "Jl. Merdeka No.1, Surabaya",
        email: "hello@contoh.co",
        phone: "08123456789"
      },

      to: {
        name: "Budi Santoso",
        address: "Jl. Sudirman No.5, Jakarta",
        email: "budi@klien.com"
      },

      items: [
        {
          description: "Jasa Desain Logo",
          qty: 1,
          price: 1500000
        },
        {
          description: "Jasa Maintenance Website",
          qty: 2,
          price: 500000
        }
      ],

      taxPercent: 11,
      discountPercent: 0,

      notes:
        "Pembayaran via transfer BCA 1234567890 a.n PT Contoh Jaya",

      status: "unpaid"
    }
  } = $props();


  // ==========================================
  // REAL-TIME CALCULATION
  // ==========================================

  // Hitung subtotal setiap kali item berubah
  let subtotal = $derived(
    (invoice.items ?? []).reduce((sum, item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;

      return sum + qty * price;
    }, 0)
  );


  // Persentase diskon
  let discountPercent = $derived(
    Number(invoice.discountPercent) || 0
  );


  // Persentase pajak
  let taxPercent = $derived(
    Number(invoice.taxPercent) || 0
  );


  // Nominal diskon
  let discount = $derived(
    subtotal * (discountPercent / 100)
  );


  // Subtotal setelah diskon
  let subtotalAfterDiscount = $derived(
    subtotal - discount
  );


  // Nominal pajak
  let tax = $derived(
    subtotalAfterDiscount * (taxPercent / 100)
  );


  // Total akhir
  let total = $derived(
    subtotalAfterDiscount + tax
  );


  // ==========================================
  // FORMAT RUPIAH / CURRENCY
  // ==========================================

  const fmt = (n, cur) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: cur || "IDR",
      maximumFractionDigits: 0
    }).format(Number(n) || 0);
</script>


<div
  class="max-w-[820px] mx-auto bg-white text-slate-900 font-sans p-10 md:p-14 border border-slate-100 shadow-sm"
>

  <!-- ==========================================
       HEADER
  =========================================== -->

  <div class="flex justify-between items-start pb-8">

    <div>

      {#if invoice.logoUrl}
        <img
          src={invoice.logoUrl}
          alt="logo"
          class="h-10 mb-3"
        />
      {/if}

      <h2 class="text-lg font-semibold">
        {invoice.from?.name ?? ""}
      </h2>

      <p class="text-sm text-slate-500 leading-relaxed">
        {invoice.from?.address ?? ""}
        <br />

        {invoice.from?.email ?? ""}
        ·
        {invoice.from?.phone ?? ""}
      </p>

    </div>


    <div class="text-right">

      <h1 class="text-3xl font-bold tracking-tight text-blue-600">
        Invoice
      </h1>

      <p class="text-sm text-slate-500 mt-1">
        #{invoice.invoiceNumber}
      </p>

    </div>

  </div>


  <div class="h-px bg-slate-200 w-full"></div>


  <!-- ==========================================
       CUSTOMER + DATE
  =========================================== -->

  <div class="flex justify-between py-6 text-sm">

    <div>

      <p class="text-slate-400 uppercase tracking-wide text-xs mb-1">
        Ditagihkan kepada
      </p>

      <p class="font-medium">
        {invoice.to?.name ?? ""}
      </p>

      <p class="text-slate-500">
        {invoice.to?.address ?? ""}
      </p>

      <p class="text-slate-500">
        {invoice.to?.email ?? ""}
      </p>

    </div>


    <div class="text-right">

      <p>
        <span class="text-slate-400">
          Tanggal Terbit
        </span>

        &nbsp;

        {invoice.issueDate}
      </p>


      <p>
        <span class="text-slate-400">
          Jatuh Tempo
        </span>

        &nbsp;

        {invoice.dueDate}
      </p>


      <span
        class="inline-block mt-2 px-2.5 py-1 text-xs rounded-full
        {invoice.status === 'paid'
          ? 'bg-emerald-50 text-emerald-600'
          : 'bg-blue-50 text-blue-600'}"
      >
        {invoice.status}
      </span>

    </div>

  </div>


  <!-- ==========================================
       ITEMS
  =========================================== -->

  <table class="w-full text-sm mt-2">

    <thead>

      <tr
        class="text-slate-400 text-xs uppercase border-y border-slate-200"
      >

        <th class="text-left py-2 font-medium">
          Deskripsi
        </th>

        <th class="text-center py-2 font-medium">
          Qty
        </th>

        <th class="text-right py-2 font-medium">
          Harga
        </th>

        <th class="text-right py-2 font-medium">
          Jumlah
        </th>

      </tr>

    </thead>


    <tbody>

      {#each invoice.items ?? [] as item}

        {@const qty = Number(item.qty) || 0}
        {@const price = Number(item.price) || 0}
        {@const amount = qty * price}

        <tr class="border-b border-slate-100">

          <td class="py-3">
            {item.description}
          </td>

          <td class="py-3 text-center">
            {qty}
          </td>

          <td class="py-3 text-right">
            {fmt(price, invoice.currency)}
          </td>

          <td class="py-3 text-right font-medium">
            {fmt(amount, invoice.currency)}
          </td>

        </tr>

      {/each}

    </tbody>

  </table>


  <!-- ==========================================
       CALCULATION
  =========================================== -->

  <div class="flex justify-end mt-4">

    <div class="w-64 text-sm space-y-1.5">

      <!-- SUBTOTAL -->

      <div class="flex justify-between text-slate-500">

        <span>
          Subtotal
        </span>

        <span>
          {fmt(subtotal, invoice.currency)}
        </span>

      </div>


      <!-- DISKON -->

      {#if discountPercent > 0}

        <div class="flex justify-between text-slate-500">

          <span>
            Diskon ({discountPercent}%)
          </span>

          <span>
            -{fmt(discount, invoice.currency)}
          </span>

        </div>

      {/if}


      <!-- PAJAK -->

      {#if taxPercent > 0}

        <div class="flex justify-between text-slate-500">

          <span>
            Pajak ({taxPercent}%)
          </span>

          <span>
            {fmt(tax, invoice.currency)}
          </span>

        </div>

      {/if}


      <!-- TOTAL -->

      <div
        class="flex justify-between font-semibold text-base pt-2 border-t border-slate-200"
      >

        <span>
          Total
        </span>

        <span class="text-blue-600">
          {fmt(total, invoice.currency)}
        </span>

      </div>

    </div>

  </div>


  <!-- ==========================================
       NOTES
  =========================================== -->

  {#if invoice.notes}

    <p
      class="text-xs text-slate-400 mt-10 pt-6 border-t border-slate-100"
    >
      {invoice.notes}
    </p>

  {/if}

</div>