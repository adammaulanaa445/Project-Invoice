<script>
  // === "Crimson VAT" — merah solid penuh, headline besar, gaya invoice Eropa/VAT.
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
</script>

<div class="max-w-[820px] mx-auto bg-[#E14B4B] px-10 md:px-14 py-12 text-white">
  <div class="flex items-start justify-between">
    <div>
      <h1 class="text-5xl font-black uppercase tracking-tight">Invoice</h1>
      <p class="mt-2 text-xs">{invoice.issueDate}</p>
      <p class="text-xs">{invoice.invoiceNumber}</p>
      <p class="mt-1 text-[10px] opacity-70">Please add the invoice number to your payment description</p>
    </div>
    <div class="text-right text-xs">
      <p class="font-bold">{invoice.from.name}</p>
      <p class="opacity-80">{invoice.from.address}</p>
      {#if invoice.from.email}<p class="opacity-80">{invoice.from.email}</p>{/if}
    </div>
  </div>

  <div class="mt-10 flex justify-between text-xs">
    <div>
      <p class="uppercase font-bold">Customer</p>
      <p class="mt-1 opacity-90">{invoice.to.name}</p>
      <p class="opacity-90">{invoice.to.address}</p>
    </div>
    <div class="text-right">
      <p class="uppercase font-bold">Due Date</p>
      <p class="mt-1 opacity-90">{invoice.dueDate}</p>
      <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase rounded-full border border-white/40">{invoice.status}</span>
    </div>
  </div>

  <table class="mt-8 w-full text-sm">
    <thead>
      <tr class="border-b border-white/30 text-left text-xs uppercase">
        <th class="pb-2">Description</th><th class="pb-2 text-right">Quantity</th><th class="pb-2 text-right">Unit Price</th><th class="pb-2 text-right">Net Amount</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-white/10">
          <td class="py-3">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-6 w-56 space-y-1 text-sm">
    <div class="flex justify-between opacity-80"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between opacity-80"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between opacity-80"><span>VAT ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between border-t border-white/30 pt-2 text-lg font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
  </div>

  <div class="mt-16 flex justify-between border-t border-white/20 pt-6 text-xs">
    <div>
      <p class="uppercase font-bold">Bank Details</p>
      <p class="opacity-80">Currency: {invoice.currency}</p>
      {#if invoice.notes}<p class="opacity-80 max-w-xs mt-1">{invoice.notes}</p>{/if}
    </div>
    <div class="text-right">
      <p class="uppercase font-bold">Beneficiary</p>
      <p class="opacity-80">{invoice.from.name}</p>
    </div>
  </div>
</div>
