<script>
  // === "Dotted Blue Wave" — header biru dengan lengkungan rounded di bawah,
  // aksen pola titik di pojok kiri atas. Kesan korporat modern.
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

<div class="max-w-[820px] mx-auto overflow-hidden rounded-2xl bg-white shadow-md">
  <div class="relative bg-[#3D5AA9] px-10 md:px-14 py-8 text-white">
    <div class="absolute left-8 top-8 grid grid-cols-3 gap-1 opacity-60">
      {#each Array.from({ length: 9 }) as _}
        <span class="h-1 w-1 rounded-full bg-white"></span>
      {/each}
    </div>
    <div class="flex items-start justify-between pl-10">
      <div>
        <p class="text-lg font-bold">{invoice.from.name}</p>
        <p class="text-[10px] uppercase tracking-widest opacity-70">Invoice</p>
      </div>
      <div class="text-right text-xs">
        <p class="font-bold uppercase">Contact</p>
        <p class="opacity-80">{invoice.from.address}</p>
        {#if invoice.from.phone}<p class="opacity-80">{invoice.from.phone}</p>{/if}
      </div>
    </div>
    <div class="mt-6 flex justify-between text-xs">
      <div>
        <p class="opacity-70">Invoice to</p>
        <p class="font-bold">{invoice.to.name}</p>
      </div>
      <div class="text-right">
        <p>Invoice Date <span class="font-bold">{invoice.issueDate}</span></p>
        <p>Due Date <span class="font-bold">{invoice.dueDate}</span></p>
      </div>
    </div>
  </div>

  <div class="rounded-t-3xl bg-white px-10 md:px-14 pt-6 pb-8 -mt-4">
    <table class="w-full text-sm">
      <thead>
        <tr class="text-left text-xs uppercase tracking-wide text-[#7a7a7a]">
          <th class="pb-2">No.</th><th class="pb-2">Item Description</th><th class="pb-2 text-right">Price</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item, i}
          <tr class="border-t border-[#eee]">
            <td class="py-3 text-[#7a7a7a]">{i + 1}.</td>
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right">{item.qty}</td>
            <td class="py-3 text-right font-medium">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mt-6 flex flex-wrap justify-between gap-6">
      <div class="max-w-xs rounded-xl bg-[#F4F6FB] p-4 text-xs">
        <p class="font-bold uppercase text-[#3D5AA9]">Payment Method</p>
        <p class="mt-1 text-[#555]">{invoice.notes ?? 'Transfer bank, konfirmasi setelah pembayaran.'}</p>
      </div>
      <div class="w-56 space-y-1 text-sm">
        <div class="flex justify-between text-[#7a7a7a]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        {#if invoice.discountPercent > 0}
          <div class="flex justify-between text-[#7a7a7a]"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
        {/if}
        <div class="flex justify-between text-[#7a7a7a]"><span>Tax ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="mt-2 flex justify-between rounded-full bg-[#3D5AA9] px-4 py-2 font-bold text-white"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>
  </div>
</div>
