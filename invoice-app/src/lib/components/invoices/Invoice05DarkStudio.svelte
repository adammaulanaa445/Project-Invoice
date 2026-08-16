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

<div class="max-w-[820px] mx-auto bg-[#111111] text-slate-200 font-mono p-10 md:p-12 rounded-lg border border-emerald-500/20">
  <div class="flex justify-between items-start pb-6 border-b border-dashed border-slate-700">
    <div>
      <p class="text-emerald-400 text-xs">// billed_from</p>
      <p class="font-bold text-white">{invoice.from.name}</p>
      <p class="text-slate-500 text-sm">{invoice.from.email}</p>
    </div>
    <div class="text-right">
      <h1 class="text-2xl font-bold text-emerald-400">&gt; invoice</h1>
      <p class="text-slate-500 text-sm">id: {invoice.invoiceNumber}</p>
    </div>
  </div>

  <div class="flex justify-between text-sm py-6">
    <div>
      <p class="text-emerald-400 text-xs">// billed_to</p>
      <p class="text-white">{invoice.to.name}</p>
      <p class="text-slate-500">{invoice.to.address}</p>
    </div>
    <div class="text-right text-slate-400">
      <p>issued: {invoice.issueDate}</p>
      <p>due: {invoice.dueDate}</p>
      <p class="text-emerald-400 mt-1">status: {invoice.status}</p>
    </div>
  </div>

  <table class="w-full text-sm">
    <thead>
      <tr class="text-emerald-400/80 border-y border-slate-700">
        <th class="text-left py-2 font-normal">item</th>
        <th class="text-center py-2 font-normal">qty</th>
        <th class="text-right py-2 font-normal">price</th>
        <th class="text-right py-2 font-normal">amount</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-slate-800">
          <td class="py-3 text-slate-200">{item.description}</td>
          <td class="py-3 text-center">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right text-white">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="flex justify-end mt-4">
    <div class="w-64 text-sm space-y-1.5">
      <div class="flex justify-between text-slate-500"><span>subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between text-slate-500"><span>tax ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between font-bold text-base pt-2 border-t border-emerald-500/30 text-emerald-400"><span>total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
  {#if invoice.notes}<p class="text-xs text-slate-600 mt-8">/* {invoice.notes} */</p>{/if}
</div>