<script>
  // Tema: Modern Minimalis — whitespace lega, tipografi sans-serif tipis, tanpa border tebal
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
    notes: "Terima kasih sudah bekerja sama dengan kami.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-white p-12 md:p-16 font-sans text-[#111111]">
  <!-- Header super simpel -->
  <div class="flex justify-between items-start mb-16">
    <div>
      <p class="text-xs tracking-[0.3em] uppercase text-[#111111]/40 mb-1">Invoice</p>
      <h1 class="text-2xl font-light">{invoice.invoiceNumber}</h1>
    </div>
    <div class="text-right text-xs text-[#111111]/50 space-y-0.5">
      <p>Terbit: {invoice.issueDate}</p>
      <p>Tempo: {invoice.dueDate}</p>
      <p class="uppercase tracking-wider text-[10px] mt-1">{invoice.status}</p>
    </div>
  </div>

  <!-- From / To minimalis tanpa label besar -->
  <div class="grid grid-cols-2 gap-10 mb-16 text-sm">
    <div>
      <p class="text-[10px] uppercase tracking-widest text-[#111111]/35 mb-2">Dari</p>
      <p class="font-medium">{invoice.from.name}</p>
      <p class="text-[#111111]/50 text-xs leading-6 mt-1">{invoice.from.address}<br/>{invoice.from.email}</p>
    </div>
    <div>
      <p class="text-[10px] uppercase tracking-widest text-[#111111]/35 mb-2">Kepada</p>
      <p class="font-medium">{invoice.to.name}</p>
      <p class="text-[#111111]/50 text-xs leading-6 mt-1">{invoice.to.address}<br/>{invoice.to.email}</p>
    </div>
  </div>

  <!-- Item list tanpa tabel, cukup baris tipis -->
  <div class="mb-12">
    {#each invoice.items as item}
      <div class="flex justify-between items-center py-4 border-b border-[#111111]/8">
        <div>
          <p class="text-sm">{item.description}</p>
          <p class="text-xs text-[#111111]/40 mt-0.5">{item.qty} × {fmt(item.price, invoice.currency)}</p>
        </div>
        <p class="text-sm tabular-nums">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <!-- Total, rata kanan, sangat ringkas -->
  <div class="flex justify-end">
    <div class="w-64 text-sm">
      <div class="flex justify-between py-1 text-[#111111]/50"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1 text-[#111111]/50"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-4 mt-2 border-t border-[#111111] text-lg"><span>Total</span><span class="font-medium">{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-xs text-[#111111]/40 mt-16 leading-relaxed">{invoice.notes}</p>
  {/if}
</div>
