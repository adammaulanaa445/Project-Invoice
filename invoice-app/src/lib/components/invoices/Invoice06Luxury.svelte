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
    notes: "Terima kasih atas kepercayaan Anda.",
    status: "unpaid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#FDFBF7] text-[#2B2620] p-12 md:p-16 border border-[#B08D57]/30">
  <div class="text-center mb-10">
    {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-10 mx-auto mb-3" />{/if}
    <h1 class="font-serif text-4xl tracking-[0.2em] text-[#B08D57]">INVOICE</h1>
    <div class="w-16 h-px bg-[#B08D57] mx-auto mt-3"></div>
  </div>

  <div class="flex justify-between text-sm mb-10">
    <div>
      <p class="text-[10px] tracking-[0.15em] text-[#B08D57] mb-1">DARI</p>
      <p class="font-serif text-lg">{invoice.from.name}</p>
      <p class="text-[#6b6255] text-xs">{invoice.from.address}</p>
    </div>
    <div class="text-right">
      <p class="text-[10px] tracking-[0.15em] text-[#B08D57] mb-1">KEPADA</p>
      <p class="font-serif text-lg">{invoice.to.name}</p>
      <p class="text-[#6b6255] text-xs">{invoice.to.address}</p>
    </div>
  </div>

  <div class="flex justify-between text-xs text-[#6b6255] mb-8">
    <span>No. {invoice.invoiceNumber}</span>
    <span>Terbit {invoice.issueDate} &nbsp;·&nbsp; Jatuh Tempo {invoice.dueDate}</span>
  </div>

  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-[#B08D57]">
        <th class="text-left py-2 font-normal text-[#B08D57] text-xs tracking-wider">DESKRIPSI</th>
        <th class="text-center py-2 font-normal text-[#B08D57] text-xs tracking-wider">QTY</th>
        <th class="text-right py-2 font-normal text-[#B08D57] text-xs tracking-wider">HARGA</th>
        <th class="text-right py-2 font-normal text-[#B08D57] text-xs tracking-wider">JUMLAH</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-[#B08D57]/15">
          <td class="py-3 font-serif">{item.description}</td>
          <td class="py-3 text-center">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="flex justify-end mt-6">
    <div class="w-64 text-sm space-y-2">
      <div class="flex justify-between text-[#6b6255]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between text-[#6b6255]"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between font-serif text-xl pt-3 border-t border-[#B08D57] text-[#B08D57]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}<p class="text-center text-xs italic text-[#6b6255] mt-12">{invoice.notes}</p>{/if}
</div>