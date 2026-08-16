<script>
  let { invoice = {
    invoiceNumber: "INV-0001", issueDate: "2026-08-14", dueDate: "2026-08-28",
    currency: "IDR", logoUrl: "",
    from: { name: "PT Contoh Jaya", address: "Jl. Merdeka No.1, Surabaya", email: "hello@contoh.co", phone: "08123456789" },
    to: { name: "Budi Santoso", address: "Jl. Sudirman No.5, Jakarta", email: "budi@klien.com" },
    items: [
      { description: "Jasa Desain Logo", qty: 1, price: 1500000 },
      { description: "Jasa Maintenance Website", qty: 2, price: 500000 }
    ],
    taxPercent: 11, discountPercent: 0,
    notes: "Pembayaran via transfer BCA 1234567890 a.n PT Contoh Jaya",
    status: "unpaid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto flex bg-white font-sans shadow-sm overflow-hidden">
  <div class="w-56 bg-[#F43F5E] text-white p-6 flex flex-col justify-between shrink-0">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-4 brightness-0 invert" />{/if}
      <p class="text-xs uppercase tracking-wider text-white/70 mb-1">Dari</p>
      <p class="font-semibold">{invoice.from.name}</p>
      <p class="text-sm text-white/80 mt-1">{invoice.from.address}</p>
      <p class="text-sm text-white/80">{invoice.from.email}</p>

      <p class="text-xs uppercase tracking-wider text-white/70 mt-6 mb-1">Kepada</p>
      <p class="font-semibold">{invoice.to.name}</p>
      <p class="text-sm text-white/80 mt-1">{invoice.to.address}</p>
    </div>
    <div class="text-xs text-white/70 space-y-1">
      <p>Terbit: {invoice.issueDate}</p>
      <p>Jatuh tempo: {invoice.dueDate}</p>
    </div>
  </div>

  <div class="flex-1 p-8">
    <div class="flex justify-between items-baseline mb-6">
      <h1 class="text-3xl font-black text-slate-900">Invoice</h1>
      <p class="text-slate-400 text-sm">#{invoice.invoiceNumber}</p>
    </div>

    <table class="w-full text-sm">
      <thead>
        <tr class="text-slate-400 text-xs uppercase border-b-2 border-slate-900">
          <th class="text-left py-2 font-medium">Deskripsi</th>
          <th class="text-center py-2 font-medium">Qty</th>
          <th class="text-right py-2 font-medium">Harga</th>
          <th class="text-right py-2 font-medium">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-slate-100">
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-center">{item.qty}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right font-semibold">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="flex justify-end mt-5">
      <div class="w-56 text-sm space-y-1.5">
        <div class="flex justify-between text-slate-500"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between text-slate-500"><span>Pajak</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between font-black text-lg pt-2 border-t-2 border-slate-900 text-[#F43F5E]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>
  </div>
</div>