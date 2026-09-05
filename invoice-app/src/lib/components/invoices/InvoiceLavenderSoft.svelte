<script>
  // === "Lavender Soft" — pastel ungu lembut, kartu ringkasan rounded besar.
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

<div class="max-w-[820px] mx-auto bg-white px-10 md:px-14 py-10 text-[#4a4560]">
  <div class="flex items-start justify-between">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-9 mb-2" />{/if}
      <h1 class="text-2xl font-bold">{invoice.from.name}</h1>
      <p class="text-xs opacity-60">{invoice.from.address}</p>
    </div>
    <div class="rounded-2xl px-4 py-2 text-right" style="background:#EDE7F6">
      <p class="text-xs opacity-60">Invoice</p>
      <p class="font-bold">{invoice.invoiceNumber}</p>
    </div>
  </div>

  <div class="mt-6 grid grid-cols-3 gap-3">
    <div class="rounded-xl p-3 text-xs" style="background:#F5F2FA">
      <p class="opacity-50 uppercase">Bill To</p>
      <p class="font-bold mt-1">{invoice.to.name}</p>
    </div>
    <div class="rounded-xl p-3 text-xs" style="background:#F5F2FA">
      <p class="opacity-50 uppercase">Issued</p>
      <p class="font-bold mt-1">{invoice.issueDate}</p>
    </div>
    <div class="rounded-xl p-3 text-xs" style="background:#F5F2FA">
      <p class="opacity-50 uppercase">Due</p>
      <p class="font-bold mt-1">{invoice.dueDate}</p>
    </div>
  </div>

  <table class="mt-8 w-full text-sm">
    <thead>
      <tr class="text-left text-xs uppercase" style="color:#9C8FC7">
        <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Price</th><th class="pb-2 text-right">Total</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-t" style="border-color:#EDE7F6">
          <td class="py-3">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-3 text-right font-medium">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="ml-auto mt-6 w-60 rounded-2xl p-4 space-y-1 text-sm" style="background:#F5F2FA">
    <div class="flex justify-between opacity-60"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
    {#if invoice.discountPercent > 0}
      <div class="flex justify-between opacity-60"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
    {/if}
    <div class="flex justify-between opacity-60"><span>Tax</span><span>{fmt(tax, invoice.currency)}</span></div>
    <div class="flex justify-between pt-2 font-bold" style="border-top: 1px solid #d8cdf0"><span>Total</span><span style="color:#7C4DFF">{fmt(total, invoice.currency)}</span></div>
  </div>

  {#if invoice.notes}
    <p class="mt-8 text-xs opacity-50">{invoice.notes}</p>
  {/if}
</div>
