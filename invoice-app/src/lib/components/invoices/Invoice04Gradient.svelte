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
    status: "paid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-white rounded-3xl overflow-hidden shadow-xl font-sans">
  <div class="bg-gradient-to-r from-violet-600 to-blue-500 px-10 py-8 text-white flex justify-between items-start">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-9 mb-2 brightness-0 invert" />{/if}
      <p class="font-semibold text-lg">{invoice.from.name}</p>
      <p class="text-white/70 text-sm">{invoice.from.email}</p>
    </div>
    <div class="text-right">
      <h1 class="text-2xl font-bold">Invoice</h1>
      <p class="text-white/70 text-sm">#{invoice.invoiceNumber}</p>
      <span class="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur">{invoice.status}</span>
    </div>
  </div>

  <div class="px-10 py-8">
    <div class="flex justify-between text-sm mb-6">
      <div>
        <p class="text-slate-400 text-xs uppercase mb-1">Kepada</p>
        <p class="font-medium text-slate-800">{invoice.to.name}</p>
        <p class="text-slate-500">{invoice.to.address}</p>
      </div>
      <div class="text-right text-slate-500">
        <p>Terbit: {invoice.issueDate}</p>
        <p>Jatuh Tempo: {invoice.dueDate}</p>
      </div>
    </div>

    <div class="space-y-3">
      {#each invoice.items as item}
        <div class="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-3 text-sm">
          <div>
            <p class="font-medium text-slate-700">{item.description}</p>
            <p class="text-slate-400 text-xs">{item.qty} x {fmt(item.price, invoice.currency)}</p>
          </div>
          <p class="font-semibold text-slate-800">{fmt(item.qty * item.price, invoice.currency)}</p>
        </div>
      {/each}
    </div>

    <div class="flex justify-end mt-6">
      <div class="w-64 text-sm space-y-1.5">
        <div class="flex justify-between text-slate-500"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between text-slate-500"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between font-bold text-base pt-2 border-t border-slate-200">
          <span>Total</span>
          <span class="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">{fmt(total, invoice.currency)}</span>
        </div>
      </div>
    </div>
  </div>
</div>