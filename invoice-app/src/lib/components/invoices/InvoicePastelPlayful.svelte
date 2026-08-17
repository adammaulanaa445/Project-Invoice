<script>
  // Tema: Pastel Playful — warna-warna lembut, bentuk serba rounded, kesan ceria & santai
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
    notes: "Yeay, makasih banyak sudah order ya! 🎉",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#FFF9FC] p-10 md:p-14 font-sans text-[#5B4B5A] rounded-3xl border-4 border-[#FBCFE8] relative overflow-hidden">
  <!-- Blob dekoratif -->
  <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#FDE68A] rounded-full opacity-40"></div>
  <div class="absolute -bottom-14 -left-14 w-48 h-48 bg-[#A7F3D0] rounded-full opacity-40"></div>

  <div class="relative">
    <div class="flex justify-between items-start mb-10">
      <div>
        <h1 class="text-4xl font-extrabold text-[#EC4899]">Invoice 🌸</h1>
        <p class="text-sm text-[#5B4B5A]/60 mt-1">dari {invoice.from.name}</p>
      </div>
      <span class="bg-[#FDE68A] text-[#92400E] text-xs font-bold uppercase px-4 py-2 rounded-full rotate-3">{invoice.status}</span>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="bg-[#FCE7F3] rounded-2xl p-4">
        <p class="text-[10px] uppercase font-bold text-[#EC4899] mb-1">No. Invoice</p>
        <p class="font-semibold">{invoice.invoiceNumber}</p>
      </div>
      <div class="bg-[#DBEAFE] rounded-2xl p-4">
        <p class="text-[10px] uppercase font-bold text-[#3B82F6] mb-1">Jatuh Tempo</p>
        <p class="font-semibold">{invoice.dueDate}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-5 mb-8 shadow-sm">
      <p class="text-[10px] uppercase font-bold text-[#5B4B5A]/40 mb-1">Untuk</p>
      <p class="font-bold">{invoice.to.name}</p>
      <p class="text-sm text-[#5B4B5A]/60">{invoice.to.address}</p>
    </div>

    <div class="space-y-3 mb-8">
      {#each invoice.items as item}
        <div class="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm">
          <div>
            <p class="font-semibold">{item.description}</p>
            <p class="text-xs text-[#5B4B5A]/50">{item.qty} x {fmt(item.price, invoice.currency)}</p>
          </div>
          <p class="font-bold text-[#EC4899]">{fmt(item.qty * item.price, invoice.currency)}</p>
        </div>
      {/each}
    </div>

    <div class="flex justify-end mb-8">
      <div class="w-64 bg-[#FFF1F8] rounded-2xl p-5 text-sm">
        <div class="flex justify-between text-[#5B4B5A]/60 py-1"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between text-[#5B4B5A]/60 py-1"><span>Pajak</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between text-xl font-extrabold text-[#EC4899] pt-3 mt-2 border-t-2 border-dashed border-[#FBCFE8]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>

    {#if invoice.notes}
      <p class="text-center text-sm text-[#5B4B5A]/60 bg-[#FEF9C3] rounded-full py-2 px-4 inline-block">{invoice.notes}</p>
    {/if}
  </div>
</div>
