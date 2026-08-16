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

<div class="max-w-[820px] mx-auto font-['Poppins',sans-serif] shadow-md">
  <div class="bg-[#EA580C] h-28 relative">
    <div class="absolute -bottom-10 left-10 right-10 bg-white rounded-2xl shadow-lg px-8 py-5 flex justify-between items-center">
      <div>
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-1" />{/if}
        <p class="font-bold text-slate-800">{invoice.from.name}</p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-extrabold text-[#EA580C]">INVOICE</p>
        <p class="text-xs text-slate-400">#{invoice.invoiceNumber}</p>
      </div>
    </div>
  </div>

  <div class="bg-white pt-16 pb-10 px-10">
    <div class="grid grid-cols-2 gap-6 text-sm mb-8">
      <div class="bg-orange-50 rounded-xl p-4">
        <p class="text-[#EA580C] font-semibold text-xs uppercase mb-1">Tagihan untuk</p>
        <p class="font-semibold">{invoice.to.name}</p>
        <p class="text-slate-500">{invoice.to.address}</p>
      </div>
      <div class="bg-slate-50 rounded-xl p-4">
        <p class="flex justify-between"><span class="text-slate-400">Terbit</span><span>{invoice.issueDate}</span></p>
        <p class="flex justify-between"><span class="text-slate-400">Jatuh Tempo</span><span>{invoice.dueDate}</span></p>
      </div>
    </div>

    <div class="rounded-xl overflow-hidden border border-slate-100">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-[#EA580C] text-white">
            <th class="text-left py-2.5 px-4 font-medium">Deskripsi</th>
            <th class="text-center py-2.5 px-4 font-medium">Qty</th>
            <th class="text-right py-2.5 px-4 font-medium">Harga</th>
            <th class="text-right py-2.5 px-4 font-medium">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {#each invoice.items as item, idx}
            <tr class={idx % 2 === 0 ? "bg-white" : "bg-orange-50/40"}>
              <td class="py-3 px-4">{item.description}</td>
              <td class="py-3 px-4 text-center">{item.qty}</td>
              <td class="py-3 px-4 text-right">{fmt(item.price, invoice.currency)}</td>
              <td class="py-3 px-4 text-right font-semibold">{fmt(item.qty * item.price, invoice.currency)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-5">
      <div class="w-72 bg-slate-900 text-white rounded-xl p-5 text-sm space-y-1.5">
        <div class="flex justify-between text-slate-300"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between text-slate-300"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between font-bold text-lg pt-2 border-t border-white/20 text-[#FDBA74]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>
  </div>
</div>