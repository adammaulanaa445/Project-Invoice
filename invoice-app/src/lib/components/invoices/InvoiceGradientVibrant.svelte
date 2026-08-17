<script>
  // Tema: Gradient Vibrant — gradasi warna cerah, sangat colorful, cocok brand yang energik & muda
  let { invoice = {
    invoiceNumber: "INV-0001", issueDate: "2026-08-14", dueDate: "2026-08-28",
    currency: "IDR", logoUrl: "",
    from: { name: "Studio Kata", address: "Jl. Merdeka No.1, Surabaya", email: "hi@studiokata.co", phone: "08123456789" },
    to: { name: "Budi Santoso", address: "Jl. Sudirman No.5, Jakarta", email: "budi@klien.com" },
    items: [
      { description: "Ilustrasi Karakter", qty: 1, price: 1500000 },
      { description: "Revisi & Finishing", qty: 2, price: 500000 }
    ],
    taxPercent: 11, discountPercent: 0,
    notes: "Semangat terus berkarya bareng kita ya! 🚀",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-white p-0 font-sans text-[#1F1147] overflow-hidden rounded-3xl shadow-lg">
  <!-- Header gradient warna-warni -->
  <div class="p-10 md:p-12 text-white relative overflow-hidden" style="background: linear-gradient(120deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%);">
    <div class="relative flex justify-between items-start">
      <div>
        <p class="text-xs uppercase tracking-widest text-white/80">Invoice dari</p>
        <h1 class="text-3xl font-extrabold mt-1">{invoice.from.name}</h1>
      </div>
      <span class="bg-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase">{invoice.status}</span>
    </div>
    <div class="relative flex gap-8 mt-8 text-sm text-white/90">
      <div><p class="text-[10px] uppercase text-white/60">No. Invoice</p><p class="font-semibold">{invoice.invoiceNumber}</p></div>
      <div><p class="text-[10px] uppercase text-white/60">Terbit</p><p class="font-semibold">{invoice.issueDate}</p></div>
      <div><p class="text-[10px] uppercase text-white/60">Tempo</p><p class="font-semibold">{invoice.dueDate}</p></div>
    </div>
  </div>

  <div class="p-10 md:p-12">
    <div class="mb-8">
      <p class="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-bold mb-1">Untuk</p>
      <p class="font-bold text-lg">{invoice.to.name}</p>
      <p class="text-sm text-[#1F1147]/50">{invoice.to.address} · {invoice.to.email}</p>
    </div>

    <div class="space-y-3 mb-8">
      {#each invoice.items as item, i}
        <div class="flex justify-between items-center p-4 rounded-2xl" style="background: {i % 2 === 0 ? '#FEF3E8' : '#FCE7F3'};">
          <div>
            <p class="font-semibold text-sm">{item.description}</p>
            <p class="text-xs text-[#1F1147]/40">{item.qty} x {fmt(item.price, invoice.currency)}</p>
          </div>
          <p class="font-bold" style="color: {i % 2 === 0 ? '#F97316' : '#EC4899'};">{fmt(item.qty * item.price, invoice.currency)}</p>
        </div>
      {/each}
    </div>

    <div class="flex justify-end mb-8">
      <div class="w-72 text-sm">
        <div class="flex justify-between py-1 text-[#1F1147]/50"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between py-1 text-[#1F1147]/50"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between items-center px-5 py-3.5 mt-2 rounded-2xl text-white text-xl font-extrabold" style="background: linear-gradient(120deg, #F97316, #EC4899, #8B5CF6);"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>

    {#if invoice.notes}
      <p class="text-sm text-center text-[#1F1147]/50">{invoice.notes}</p>
    {/if}
  </div>
</div>
