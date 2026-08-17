<script>
  // Tema: Retro Vintage — kertas kecoklatan, gaya mesin tik, stempel bulat, kesan dokumen jadul
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
    notes: "Simpan invoice ini sebagai bukti transaksi yang sah.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<!-- Opsional: font mesin tik seperti "Courier Prime" atau "Special Elite" via Google Fonts akan menambah kesan vintage -->
<div class="max-w-[820px] mx-auto bg-[#E9DFC9] p-10 md:p-14 font-mono text-[#3B3226] border-[6px] border-double border-[#8B7355] relative">
  <!-- Stempel PAID/UNPAID -->
  <div class="absolute top-10 right-10 w-24 h-24 border-4 border-[#B91C1C] rounded-full flex items-center justify-center rotate-[-15deg] opacity-70">
    <span class="text-[#B91C1C] text-xs font-bold uppercase text-center leading-tight">{invoice.status}</span>
  </div>

  <div class="text-center mb-10 border-b-2 border-dashed border-[#8B7355] pb-6">
    <h1 class="text-3xl uppercase tracking-[0.2em] font-bold">Invoice</h1>
    <p class="text-xs mt-2 text-[#3B3226]/60">— {invoice.from.name} —</p>
  </div>

  <div class="flex justify-between text-xs mb-8">
    <div>
      <p>No. Berkas : {invoice.invoiceNumber}</p>
      <p>Tanggal    : {invoice.issueDate}</p>
      <p>Tempo      : {invoice.dueDate}</p>
    </div>
    <div class="text-right">
      <p class="uppercase text-[10px] text-[#8B7355] mb-1">Ditagihkan kepada:</p>
      <p class="font-bold">{invoice.to.name}</p>
      <p>{invoice.to.address}</p>
    </div>
  </div>

  <table class="w-full text-xs mb-8 border-t-2 border-b-2 border-[#8B7355] border-dashed">
    <thead>
      <tr class="uppercase text-[10px]">
        <th class="text-left py-2">Uraian</th>
        <th class="text-center py-2">Jml</th>
        <th class="text-right py-2">Harga</th>
        <th class="text-right py-2">Total</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-t border-[#8B7355]/30">
          <td class="py-2">{item.description}</td>
          <td class="py-2 text-center">{item.qty}</td>
          <td class="py-2 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-2 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="flex justify-end mb-10">
    <div class="w-64 text-xs">
      <div class="flex justify-between py-1"><span>Subtotal ......</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1"><span>Pajak {invoice.taxPercent}% ....</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between py-2 mt-1 border-t-2 border-[#3B3226] font-bold text-sm"><span>JUMLAH TOTAL</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-xs text-center text-[#3B3226]/70 italic">"{invoice.notes}"</p>
  {/if}

  <p class="text-center text-[10px] text-[#8B7355] mt-10 uppercase tracking-widest">— Dokumen Sah Tanpa Tanda Tangan Basah —</p>
</div>
