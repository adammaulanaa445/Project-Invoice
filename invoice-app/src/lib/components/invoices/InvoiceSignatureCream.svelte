<script>
  // === "Signature Cream" — monogram elegan, garis tipis pembatas, tanda tangan
  // serif italic di kanan bawah. Sangat minimalis dan formal.
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
  const initials = invoice.from.name.split(' ').map(w => w[0]).join('').slice(0, 2);
</script>

<div class="max-w-[820px] mx-auto bg-[#F1EAE2] px-10 md:px-14 py-12 text-[#26221d]">
  <div class="flex items-start justify-between">
    <div class="flex items-center gap-2">
      {#if invoice.logoUrl}
        <img src={invoice.logoUrl} alt="logo" class="h-9" />
      {:else}
        <span class="font-serif text-2xl italic">{initials}</span>
      {/if}
      <div class="border-l border-[#26221d]/30 pl-2 text-[9px] uppercase tracking-widest">{invoice.from.name}</div>
    </div>
    <h1 class="font-serif text-3xl">Invoice</h1>
  </div>

  <div class="mt-8 flex justify-between text-xs">
    <div>
      <p class="font-bold uppercase">Billed From</p>
      <p class="mt-1">Invoice No. {invoice.invoiceNumber}</p>
      <p>Issue Date: {invoice.issueDate}</p>
      <p>Due Date: {invoice.dueDate}</p>
    </div>
    <div class="text-right">
      <p class="font-bold uppercase">Billed To</p>
      <p class="mt-1">{invoice.to.name}</p>
      {#if invoice.to.email}<p>{invoice.to.email}</p>{/if}
      <p>{invoice.to.address}</p>
    </div>
  </div>

  <table class="mt-10 w-full text-sm">
    <thead>
      <tr class="border-b border-[#26221d] text-left text-xs uppercase tracking-wide">
        <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Rate</th><th class="pb-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-[#26221d]/15">
          <td class="py-3">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-4 w-56 space-y-1 text-sm">
    <div class="flex justify-between"><span>Sub-Total</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between"><span>Tax ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between border-t border-[#26221d] pt-2 font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
  </div>

  <div class="mt-16 flex items-end justify-between text-xs">
    <div>
      <p class="font-bold uppercase">Contact</p>
      {#if invoice.from.phone}<p>{invoice.from.phone}</p>{/if}
      {#if invoice.from.email}<p>{invoice.from.email}</p>{/if}
    </div>
    <div class="text-right">
      <p class="font-bold uppercase">Notes</p>
      <p class="max-w-xs">{invoice.notes ?? '—'}</p>
    </div>
  </div>

  <p class="mt-10 text-right font-serif text-xl italic">Thank You!</p>
</div>
