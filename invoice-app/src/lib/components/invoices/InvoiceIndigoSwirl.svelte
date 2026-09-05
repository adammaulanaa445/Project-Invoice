<script>
  // === "Indigo Swirl" — logo bentuk swirl/lingkaran ganda, header tabel ungu solid.
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

<div class="max-w-[820px] mx-auto bg-white px-10 md:px-14 py-10 text-[#2b2740]">
  <div class="flex items-start justify-between">
    <div class="flex items-center gap-3">
      {#if invoice.logoUrl}
        <img src={invoice.logoUrl} alt="logo" class="h-10 w-10 rounded-full object-cover" />
      {:else}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6C4CE0" stroke-width="2"><path d="M12 3a9 9 0 1 0 6.5 15.2" stroke-linecap="round"/><circle cx="17" cy="6" r="2" fill="#6C4CE0" stroke="none"/></svg>
      {/if}
      <div>
        <p class="font-bold text-lg">{invoice.from.name}</p>
      </div>
    </div>
    <div class="text-right">
      <h1 class="text-3xl font-black" style="color:#6C4CE0">INVOICE</h1>
      <p class="text-xs text-[#7a7a8a]">{invoice.issueDate}</p>
    </div>
  </div>

  <div class="mt-6 flex justify-between text-xs">
    <div>
      <p class="font-bold uppercase">Office Address</p>
      <p class="text-[#7a7a8a]">{invoice.from.address}</p>
      {#if invoice.from.phone}<p class="text-[#7a7a8a]">{invoice.from.phone}</p>{/if}
    </div>
    <div class="text-right">
      <p class="font-bold uppercase">To</p>
      <p class="text-[#7a7a8a]">{invoice.to.name}</p>
      <p class="text-[#7a7a8a]">{invoice.to.address}</p>
    </div>
  </div>

  <table class="mt-8 w-full overflow-hidden rounded-lg text-sm">
    <thead>
      <tr class="text-left text-xs uppercase text-white" style="background:#6C4CE0">
        <th class="px-3 py-2">Items Description</th><th class="px-3 py-2 text-right">Unit Price</th><th class="px-3 py-2 text-right">Qty</th><th class="px-3 py-2 text-right">Total</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-[#eee]">
          <td class="px-3 py-3">{item.description}</td>
          <td class="px-3 py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="px-3 py-3 text-right">{item.qty}</td>
          <td class="px-3 py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="mt-6 flex flex-wrap justify-between gap-6">
    {#if invoice.notes}
      <div class="max-w-xs text-xs">
        <p class="font-bold uppercase" style="color:#6C4CE0">Note</p>
        <p class="mt-1 text-[#7a7a8a]">{invoice.notes}</p>
      </div>
    {/if}
    <div class="ml-auto w-56 space-y-1 text-sm">
      <div class="flex justify-between text-[#7a7a8a]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-[#7a7a8a]"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-[#7a7a8a]"><span>Tax VAT</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="mt-2 flex justify-between rounded-lg px-3 py-2 font-bold text-white" style="background:#6C4CE0"><span>Total Due</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
</div>
