<script>
  // Tema: Bold Typography — huruf raksasa, kontras hitam-kuning, kesan berani & eye-catching
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
    notes: "Bayar tepat waktu, kolaborasi lancar!",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#F5F0E8] p-10 md:p-14 font-sans text-[#111111]">
  <!-- Judul raksasa -->
  <h1 class="text-7xl font-black uppercase leading-[0.85] tracking-tighter mb-6">Invoice</h1>

  <div class="flex justify-between items-end border-b-4 border-black pb-6 mb-8">
    <p class="text-sm font-bold uppercase">{invoice.from.name}</p>
    <span class="bg-[#111111] text-[#F5E14A] px-4 py-1.5 text-xs font-black uppercase">{invoice.status}</span>
  </div>

  <div class="grid grid-cols-3 gap-4 mb-10 text-xs">
    <div class="bg-[#111111] text-white p-4">
      <p class="text-[#F5E14A] font-bold uppercase text-[10px] mb-1">No.</p>
      <p class="font-bold">{invoice.invoiceNumber}</p>
    </div>
    <div class="bg-[#111111] text-white p-4">
      <p class="text-[#F5E14A] font-bold uppercase text-[10px] mb-1">Terbit</p>
      <p class="font-bold">{invoice.issueDate}</p>
    </div>
    <div class="bg-[#111111] text-white p-4">
      <p class="text-[#F5E14A] font-bold uppercase text-[10px] mb-1">Tempo</p>
      <p class="font-bold">{invoice.dueDate}</p>
    </div>
  </div>

  <div class="mb-10">
    <p class="text-[10px] uppercase font-bold text-black/40 mb-1">Untuk</p>
    <p class="text-2xl font-black">{invoice.to.name}</p>
    <p class="text-sm text-black/50">{invoice.to.address}</p>
  </div>

  <div class="space-y-0 mb-10">
    {#each invoice.items as item}
      <div class="flex justify-between items-center py-4 border-b-2 border-black">
        <div>
          <p class="font-bold text-lg uppercase">{item.description}</p>
          <p class="text-xs text-black/40">{item.qty} × {fmt(item.price, invoice.currency)}</p>
        </div>
        <p class="font-black text-lg">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <div class="flex justify-end mb-10">
    <div class="w-72 text-sm">
      <div class="flex justify-between py-1 text-black/50"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1 text-black/50"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between items-center bg-[#F5E14A] px-4 py-3 mt-2 text-2xl font-black"><span>TOTAL</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-sm font-bold uppercase tracking-wide">{invoice.notes}</p>
  {/if}
</div>
