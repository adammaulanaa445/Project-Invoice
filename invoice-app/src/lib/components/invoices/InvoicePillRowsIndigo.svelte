<script>
  // === "Pill Rows Indigo" — baris item berbentuk pill/kapsul, header tabel gelap.
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

<div class="max-w-[820px] mx-auto bg-[#F3F4FA] px-10 md:px-14 py-10 text-[#2b2a45]">
  <div class="flex items-start justify-between">
    <h1 class="text-4xl font-black">Invoice <span style="color:#3F3D9E">✦</span></h1>
    <div class="text-right text-xs">
      <p>No: {invoice.invoiceNumber}</p>
      <p>Date: {invoice.issueDate}</p>
      <p>Due Date: {invoice.dueDate}</p>
    </div>
  </div>

  <div class="mt-4 flex justify-between text-xs">
    <div>
      <p class="italic opacity-70">Invoice to</p>
      <p class="font-bold">{invoice.to.name}</p>
    </div>
    <div class="text-right opacity-70">
      {#if invoice.from.phone}<p>{invoice.from.phone}</p>{/if}
      {#if invoice.from.email}<p>{invoice.from.email}</p>{/if}
      <p>{invoice.from.address}</p>
    </div>
  </div>

  <div class="mt-6 overflow-hidden rounded-2xl" style="background:#3F3D9E">
    <div class="grid grid-cols-4 px-4 py-2 text-xs font-bold uppercase text-white">
      <span>Item</span><span class="text-right">Qty</span><span class="text-right">Price</span><span class="text-right">Total</span>
    </div>
  </div>

  <div class="mt-2 space-y-1.5">
    {#each invoice.items as item, i}
      <div class="grid grid-cols-4 items-center rounded-full bg-white px-4 py-2.5 text-xs shadow-sm">
        <span>{item.description}</span>
        <span class="text-right">{item.qty}</span>
        <span class="text-right">{fmt(item.price, invoice.currency)}</span>
        <span class="text-right font-medium">{fmt(item.qty * item.price, invoice.currency)}</span>
      </div>
    {/each}
  </div>

  <div class="mt-4 space-y-1.5">
    <div class="grid grid-cols-2 items-center rounded-full bg-white px-4 py-2 text-xs shadow-sm">
      <span class="opacity-60">Subtotal</span><span class="text-right">{fmt(subtotal, invoice.currency)}</span>
    </div>
    {#if invoice.discountPercent > 0}
      <div class="grid grid-cols-2 items-center rounded-full bg-white px-4 py-2 text-xs shadow-sm">
        <span class="opacity-60">Discount</span><span class="text-right">-{fmt(discount, invoice.currency)}</span>
      </div>
    {/if}
    <div class="grid grid-cols-2 items-center rounded-full px-4 py-2.5 text-sm font-bold text-white" style="background:#3F3D9E">
      <span>Total Due</span><span class="text-right">{fmt(total, invoice.currency)}</span>
    </div>
  </div>

  <div class="mt-10 flex justify-between text-xs">
    <div>
      <p class="font-bold">Terms & Condition</p>
      <p class="mt-1 opacity-60 max-w-xs">{invoice.notes ?? '—'}</p>
    </div>
    <div class="text-right">
      <p class="font-bold">Payment Method</p>
      <p class="opacity-60">Bank Transfer</p>
    </div>
  </div>
</div>
