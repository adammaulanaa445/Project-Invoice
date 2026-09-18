<script>
  let { invoice = {
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
      { description: "Jasa Desain Logo", qty: 1, price: 1500000 },
      { description: "Jasa Maintenance Website", qty: 2, price: 500000 }
    ],

    taxPercent: 11,

    notes: "Pembayaran via transfer BCA 1234567890 a.n PT Contoh Jaya",
    status: "unpaid"
  } } = $props();

  // Hitung subtotal
  let subtotal = $derived(
    invoice.items.reduce(
      (s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0),
      0
    )
  );

  // Pajak
  // Jika input pajak kosong, dianggap 0%
  let taxPercent = $derived(Number(invoice.taxPercent) || 0);

  let tax = $derived(
    subtotal * (taxPercent / 100)
  );

  // Total = Subtotal + Pajak
  let total = $derived(
    subtotal + tax
  );

  const fmt = (n, cur) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0
    }).format(Number(n) || 0);
</script>

<div class="max-w-[820px] mx-auto bg-[#FAF7F2] text-[#1E3A5F] font-serif shadow-sm">

  <div class="bg-[#1E3A5F] text-[#FAF7F2] px-10 md:px-14 py-8 flex justify-between items-center">
    <div>
      {#if invoice.logoUrl}
        <img src={invoice.logoUrl} alt="logo" class="h-9 mb-2" />
      {/if}

      <h2 class="text-lg tracking-wide">
        {invoice.from.name}
      </h2>
    </div>

    <h1 class="text-3xl tracking-[0.15em] uppercase">
      Invoice
    </h1>
  </div>

  <div class="px-10 md:px-14 py-8">

    <div class="flex justify-between text-sm border-b border-[#1E3A5F]/20 pb-6 mb-6">

      <div>
        <p class="uppercase text-xs tracking-wider text-[#1E3A5F]/60 mb-1">
          Dari
        </p>

        <p>{invoice.from.address}</p>
        <p>{invoice.from.email} · {invoice.from.phone}</p>
      </div>

      <div class="text-right">
        <p class="uppercase text-xs tracking-wider text-[#1E3A5F]/60 mb-1">
          Kepada
        </p>

        <p class="font-semibold">
          {invoice.to.name}
        </p>

        <p>{invoice.to.address}</p>
      </div>

    </div>

    <div class="flex justify-between text-sm mb-6">

      <p>
        No. Invoice:
        <span class="font-semibold">
          {invoice.invoiceNumber}
        </span>
      </p>

      <p>
        Terbit: {invoice.issueDate}
        &nbsp;|&nbsp;
        Jatuh Tempo: {invoice.dueDate}
      </p>

    </div>

    <table class="w-full text-sm border-collapse">

      <thead>
        <tr class="border-y-2 border-[#1E3A5F]">

          <th class="text-left py-2 font-semibold">
            Deskripsi
          </th>

          <th class="text-center py-2 font-semibold">
            Qty
          </th>

          <th class="text-right py-2 font-semibold">
            Harga Satuan
          </th>

          <th class="text-right py-2 font-semibold">
            Jumlah
          </th>

        </tr>
      </thead>

      <tbody>

        {#each invoice.items as item}

          <tr class="border-b border-[#1E3A5F]/15">

            <td class="py-3">
              {item.description}
            </td>

            <td class="py-3 text-center">
              {item.qty}
            </td>

            <td class="py-3 text-right">
              {fmt(item.price, invoice.currency)}
            </td>

            <td class="py-3 text-right">
              {fmt(
                (Number(item.qty) || 0) *
                (Number(item.price) || 0),
                invoice.currency
              )}
            </td>

          </tr>

        {/each}

      </tbody>

    </table>

    <!-- Ringkasan pembayaran -->
    <div class="flex justify-end mt-4">

      <div class="w-64 text-sm space-y-1.5">

        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>
            {fmt(subtotal, invoice.currency)}
          </span>
        </div>

        <div class="flex justify-between">
          <span>
            Pajak ({taxPercent}%)
          </span>

          <span>
            {fmt(tax, invoice.currency)}
          </span>
        </div>

        <div class="flex justify-between font-bold text-base pt-2 border-t-2 border-[#1E3A5F]">

          <span>Total</span>

          <span>
            {fmt(total, invoice.currency)}
          </span>

        </div>

      </div>

    </div>

    {#if invoice.notes}
      <p class="text-xs text-[#1E3A5F]/60 italic mt-10">
        {invoice.notes}
      </p>
    {/if}

  </div>

</div>