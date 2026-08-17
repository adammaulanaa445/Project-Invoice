<script>
  // Tema: Tech / SaaS — kartu rounded modern, gradient ungu-biru, kesan produk digital/startup
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
    notes: "Ada pertanyaan seputar tagihan? Hubungi tim support kami.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#F8FAFC] p-6 md:p-10 font-sans text-[#1E1B4B]">
  <!-- Header gradient card -->
  <div class="rounded-3xl p-8 mb-6 text-white" style="background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-xs uppercase tracking-widest text-white/70">Tagihan dari</p>
        <h1 class="text-2xl font-bold mt-1">{invoice.from.name}</h1>
      </div>
      <div class="text-right">
        <p class="text-xs text-white/70">Invoice</p>
        <p class="text-xl font-bold">#{invoice.invoiceNumber}</p>
      </div>
    </div>
    <div class="flex gap-6 mt-6 text-xs text-white/80">
      <span>📅 Terbit {invoice.issueDate}</span>
      <span>⏰ Tempo {invoice.dueDate}</span>
      <span class="ml-auto bg-white/20 px-3 py-1 rounded-full uppercase font-semibold">{invoice.status}</span>
    </div>
  </div>

  <!-- Card klien -->
  <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm">
    <p class="text-[10px] uppercase tracking-widest text-[#6366F1] font-bold mb-2">Ditagihkan kepada</p>
    <p class="font-bold text-lg">{invoice.to.name}</p>
    <p class="text-sm text-[#1E1B4B]/50">{invoice.to.address}</p>
    <p class="text-sm text-[#1E1B4B]/50">{invoice.to.email}</p>
  </div>

  <!-- Card item -->
  <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm space-y-4">
    {#each invoice.items as item}
      <div class="flex justify-between items-center pb-4 border-b border-[#1E1B4B]/5 last:border-0 last:pb-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#6366F1] font-bold text-sm">{item.qty}</div>
          <div>
            <p class="font-semibold text-sm">{item.description}</p>
            <p class="text-xs text-[#1E1B4B]/40">@ {fmt(item.price, invoice.currency)}</p>
          </div>
        </div>
        <p class="font-bold text-sm">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <!-- Card total -->
  <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm">
    <div class="flex justify-between text-sm text-[#1E1B4B]/50 py-1"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    <div class="flex justify-between text-sm text-[#1E1B4B]/50 py-1"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between items-center mt-3 pt-3 border-t border-[#1E1B4B]/10">
      <span class="font-semibold">Total Tagihan</span>
      <span class="text-2xl font-extrabold" style="background: linear-gradient(135deg, #6366F1, #A855F7); -webkit-background-clip: text; background-clip: text; color: transparent;">{fmt(total, invoice.currency)}</span>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-xs text-center text-[#1E1B4B]/40">{invoice.notes}</p>
  {/if}
</div>
