<script>
  // === Invoice #19: "Editorial Merah" ===
  // Palette: krem dengan headline merah raksasa, tabel grid bergaris penuh
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

  let subtotal = invoice.items.reduce((s, i) => s + i.qty * i.price, 0);
  let discount = subtotal * (invoice.discountPercent / 100);
  let tax = (subtotal - discount) * (invoice.taxPercent / 100);
  let total = subtotal - discount + tax;
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  const emptyRows = Array.from({ length: Math.max(0, 4 - invoice.items.length) });
</script>

<div class="max-w-[820px] mx-auto bg-[#F2ECDD] px-10 md:px-14 py-10 text-[#1A1A1A]">
  <div class="flex flex-wrap items-start justify-between gap-4 border-b-4 border-[#1A1A1A] pb-4">
    <h1 class="text-5xl font-black uppercase tracking-tight text-[#C81D25]">Invoice</h1>
    <div class="text-right text-xs uppercase leading-relaxed">
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-1 ml-auto" />{/if}
      <p class="font-bold">{invoice.from.name}</p>
      <p class="text-[#555]">{invoice.from.address}</p>
    </div>
  </div>

  <div class="mt-4 flex flex-wrap justify-between gap-4 text-xs uppercase">
    <div class="space-y-0.5">
      <p>No. Invoice: #{invoice.invoiceNumber}</p>
      <p>Tanggal: {invoice.issueDate}</p>
      <p>Jatuh Tempo: {invoice.dueDate}</p>
      <p>Status: {invoice.status}</p>
    </div>
    <div class="text-right">
      <p class="font-bold">Ditagihkan kepada:</p>
      <p>{invoice.to.name}</p>
      <p class="text-[#555] normal-case">{invoice.to.address}</p>
    </div>
  </div>

  <table class="mt-8 w-full border-collapse text-sm">
    <thead>
      <tr class="bg-[#1A1A1A] text-left text-white">
        <th class="border border-[#1A1A1A] px-3 py-2 uppercase">Deskripsi</th>
        <th class="border border-[#1A1A1A] px-3 py-2 text-right uppercase">Qty</th>
        <th class="border border-[#1A1A1A] px-3 py-2 text-right uppercase">Harga</th>
        <th class="border border-[#1A1A1A] px-3 py-2 text-right uppercase">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr>
          <td class="border border-[#1A1A1A] px-3 py-2 uppercase">{item.description}</td>
          <td class="border border-[#1A1A1A] px-3 py-2 text-right">{item.qty}</td>
          <td class="border border-[#1A1A1A] px-3 py-2 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="border border-[#1A1A1A] px-3 py-2 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
      {#each emptyRows as _}
        <tr><td class="border border-[#1A1A1A] px-3 py-4"></td><td class="border border-[#1A1A1A] px-3 py-4"></td><td class="border border-[#1A1A1A] px-3 py-4"></td><td class="border border-[#1A1A1A] px-3 py-4"></td></tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-4 w-56 space-y-1 text-sm">
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between border border-[#1A1A1A] px-3 py-1"><span class="uppercase">Diskon</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between border border-[#1A1A1A] px-3 py-1"><span class="uppercase">Pajak</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between border-2 border-[#1A1A1A] bg-[#C81D25] px-3 py-2 font-black text-white"><span class="uppercase">Grand Total</span><span>{fmt(total, invoice.currency)}</span></div>
  </div>

  {#if invoice.notes}
    <div class="mt-10 border-t border-[#1A1A1A] pt-4 text-xs">
      <p class="font-bold uppercase">Catatan</p>
      <p class="mt-1 text-[#555]">{invoice.notes}</p>
    </div>
  {/if}
</div>
