<script>
  let { invoice = {
    invoiceNumber: "INV-0001", issueDate: "2026-08-14", dueDate: "2026-08-28",
    currency: "IDR", logoUrl: "",
    from: { name: "Kebun Hijau Studio", address: "Jl. Merdeka No.1, Surabaya", email: "hello@kebunhijau.co", phone: "08123456789" },
    to: { name: "Budi Santoso", address: "Jl. Sudirman No.5, Jakarta", email: "budi@klien.com" },
    items: [
      { description: "Jasa Desain Logo", qty: 1, price: 1500000 },
      { description: "Jasa Maintenance Website", qty: 2, price: 500000 }
    ],
    taxPercent: 11, discountPercent: 0,
    notes: "Terima kasih sudah mendukung bisnis lokal 🌿",
    status: "paid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#F7F5EF] rounded-[2rem] p-10 md:p-12 font-sans text-[#3D4A3D] border border-[#84A98C]/30">
  <div class="flex justify-between items-center mb-8">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-full bg-[#84A98C] flex items-center justify-center text-white text-lg">🌿</div>
      <div>
        <p class="font-bold">{invoice.from.name}</p>
        <p class="text-xs text-[#3D4A3D]/60">{invoice.from.email}</p>
      </div>
    </div>
    <div class="text-right">
      <h1 class="text-2xl font-bold text-[#5C7C5C]">Invoice</h1>
      <span class="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#84A98C]/20 text-[#5C7C5C] text-xs">{invoice.status === 'paid' ? 'Lunas ✓' : 'Belum Dibayar'}</span>
    </div>
  </div>

  <div class="bg-white rounded-2xl p-6 mb-6">
    <div class="flex justify-between text-sm">
      <div>
        <p class="text-[#5C7C5C] text-xs mb-1">Untuk</p>
        <p class="font-semibold">{invoice.to.name}</p>
        <p class="text-[#3D4A3D]/60">{invoice.to.address}</p>
      </div>
      <div class="text-right text-[#3D4A3D]/70">
        <p>No. {invoice.invoiceNumber}</p>
        <p>{invoice.issueDate} → {invoice.dueDate}</p>
      </div>
    </div>
  </div>

  <div class="space-y-2">
    {#each invoice.items as item}
      <div class="flex justify-between items-center bg-white rounded-xl px-5 py-3 text-sm">
        <div>
          <p class="font-medium">{item.description}</p>
          <p class="text-[#3D4A3D]/50 text-xs">{item.qty} item</p>
        </div>
        <p class="font-semibold text-[#5C7C5C]">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <div class="flex justify-end mt-6">
    <div class="w-64 bg-[#84A98C] text-white rounded-2xl p-5 text-sm space-y-1.5">
      <div class="flex justify-between text-white/80"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between text-white/80"><span>Pajak</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between font-bold text-lg pt-2 border-t border-white/30"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
  {#if invoice.notes}<p class="text-center text-xs text-[#3D4A3D]/60 mt-6">{invoice.notes}</p>{/if}
</div>