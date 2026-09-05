<script>
  // === "Cream Monogramme" — krem lembut, judul serif besar, logo cursive italic.
  // Terinspirasi invoice gaya feminin/kreatif dengan tipografi elegan.
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

<div class="max-w-[820px] mx-auto bg-[#FBF3E7] px-10 md:px-14 py-12 text-[#2b2620]">
  <div class="flex items-start justify-between">
    <div>
      <h1 class="font-serif text-4xl">Invoice</h1>
      <p class="mt-3 text-xs">№ {invoice.invoiceNumber}</p>
      <p class="text-xs">{invoice.issueDate}</p>
    </div>
    <div class="text-right">
      {#if invoice.logoUrl}
        <img src={invoice.logoUrl} alt="logo" class="ml-auto h-10" />
      {:else}
        <p class="font-serif text-2xl italic" style="color:#B5766D">{invoice.from.name.split(' ').map(w => w[0]).join('').slice(0,2)}</p>
      {/if}
      <p class="text-[10px] uppercase tracking-widest">{invoice.from.name}</p>
    </div>
  </div>

  <div class="mt-10 grid grid-cols-2 gap-6 text-xs">
    <div>
      <p class="font-bold uppercase tracking-wide">Billed From</p>
      <p class="mt-1">{invoice.from.name}</p>
      <p>{invoice.from.address}</p>
      {#if invoice.from.email}<p>{invoice.from.email}</p>{/if}
    </div>
    <div>
      <p class="font-bold uppercase tracking-wide">Billed To</p>
      <p class="mt-1">{invoice.to.name}</p>
      <p>{invoice.to.address}</p>
      {#if invoice.to.email}<p>{invoice.to.email}</p>{/if}
    </div>
  </div>

  <table class="mt-10 w-full text-sm">
    <thead>
      <tr class="border-b border-[#2b2620] text-left text-xs uppercase tracking-wide">
        <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Rate</th><th class="pb-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-[#e4d9c8]">
          <td class="py-3">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-4 w-56 space-y-1 text-sm">
    <div class="flex justify-between"><span>Sub Total</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between"><span>Tax</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between border-t border-[#2b2620] pt-2 font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
  </div>

  {#if invoice.notes}
    <p class="mt-10 text-center text-xs">{invoice.notes}</p>
  {/if}

  <p class="mt-6 text-center font-serif text-xl italic" style="color:#B5766D">Thank you for your business</p>
</div>
