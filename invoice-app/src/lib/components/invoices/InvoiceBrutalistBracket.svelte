<script>
  // === Invoice #18: "Brutalist Bracket" ===
  // Palette: flat hitam-putih, nama perusahaan diapit [kurung siku]
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

<div class="max-w-[820px] mx-auto border-4 border-black bg-white px-10 py-8 text-black">
  <h1 class="border-b-4 border-black pb-3 text-3xl font-black uppercase tracking-tight">[{invoice.from.name}]</h1>

  <div class="mt-4 flex flex-wrap items-start justify-between gap-4 text-xs uppercase">
    <div class="flex gap-6">
      <span>[{invoice.issueDate}]</span>
      <span>[{invoice.to.name}]</span>
      <span>[{invoice.status}]</span>
    </div>
    <span class="text-2xl font-black">Invoice</span>
  </div>

  <div class="mt-8 space-y-3 text-sm">
    {#each invoice.items as item}
      <div class="grid grid-cols-12 items-start gap-2">
        <div class="col-span-6"><p class="font-bold">{item.description}</p></div>
        <div class="col-span-2 text-right">{item.qty}</div>
        <div class="col-span-2 text-right">{fmt(item.price, invoice.currency)}</div>
        <div class="col-span-2 text-right font-bold">{fmt(item.qty * item.price, invoice.currency)}</div>
      </div>
    {/each}
  </div>

  <div class="mt-10 flex flex-wrap items-end justify-between gap-6 border-t-4 border-black pt-4">
    <div class="text-xs uppercase">
      <p class="font-black">[Pembayaran]</p>
      <p class="mt-1 text-[#555]">[Transfer Bank]</p>
      {#if invoice.notes}<p class="text-[#555] normal-case max-w-[220px]">[{invoice.notes}]</p>{/if}
    </div>
    <div class="w-56 space-y-1 text-right text-sm">
      <div class="flex justify-between"><span class="text-[#555]">Subtotal:</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between"><span class="text-[#555]">Diskon ({invoice.discountPercent}%):</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between"><span class="text-[#555]">Pajak ({invoice.taxPercent}%):</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="mt-2 flex justify-between border-t-2 border-black pt-2 text-base font-black"><span>Total:</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
</div>
