<script>
  // === "Slate Corporate" — abu kebiruan bersih, garis pemisah tegas, sangat formal.
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

<div class="max-w-[820px] mx-auto bg-[#F8FAFC] px-10 md:px-14 py-10 text-[#1E293B] border border-[#E2E8F0]">
  <div class="flex items-start justify-between border-b-2 border-[#1E293B] pb-6">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-9 mb-2" />{/if}
      <h1 class="text-xl font-bold">{invoice.from.name}</h1>
      <p class="text-xs text-[#64748B]">{invoice.from.address}</p>
      {#if invoice.from.phone}<p class="text-xs text-[#64748B]">{invoice.from.phone}</p>{/if}
    </div>
    <div class="text-right">
      <h2 class="text-2xl font-black uppercase tracking-wide">Invoice</h2>
      <p class="text-xs text-[#64748B]">No. {invoice.invoiceNumber}</p>
    </div>
  </div>

  <div class="mt-6 grid grid-cols-2 gap-6 text-xs">
    <div>
      <p class="font-bold uppercase text-[#64748B]">Bill To</p>
      <p class="mt-1 font-semibold">{invoice.to.name}</p>
      <p class="text-[#64748B]">{invoice.to.address}</p>
      {#if invoice.to.email}<p class="text-[#64748B]">{invoice.to.email}</p>{/if}
    </div>
    <div class="text-right">
      <p><span class="font-bold uppercase text-[#64748B]">Issue Date</span> {invoice.issueDate}</p>
      <p class="mt-1"><span class="font-bold uppercase text-[#64748B]">Due Date</span> {invoice.dueDate}</p>
      <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase rounded bg-[#1E293B] text-white">{invoice.status}</span>
    </div>
  </div>

  <table class="mt-8 w-full text-sm">
    <thead>
      <tr class="border-b border-[#1E293B] text-left text-xs uppercase text-[#64748B]">
        <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Rate</th><th class="pb-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-[#E2E8F0]">
          <td class="py-3">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-6 w-56 space-y-1 text-sm">
    <div class="flex justify-between text-[#64748B]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between text-[#64748B]"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between text-[#64748B]"><span>Tax ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between border-t-2 border-[#1E293B] pt-2 text-base font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
  </div>

  {#if invoice.notes}
    <p class="mt-10 border-t border-[#E2E8F0] pt-4 text-xs text-[#64748B]">{invoice.notes}</p>
  {/if}
</div>
