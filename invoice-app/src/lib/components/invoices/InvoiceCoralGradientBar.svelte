<script>
  // === "Coral Gradient Bar" — pita gradasi coral-pink di atas, layout bersih di bawah.
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

<div class="max-w-[820px] mx-auto overflow-hidden bg-white shadow-sm">
  <div class="h-4 w-full" style="background: linear-gradient(90deg, #FF6B6B, #FF9E7D, #FFC371);"></div>

  <div class="px-10 md:px-14 py-10 text-[#2f2a2a]">
    <div class="flex items-start justify-between">
      <div>
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-9 mb-2" />{/if}
        <h1 class="text-2xl font-bold">{invoice.from.name}</h1>
        <p class="text-xs opacity-60">{invoice.from.address}</p>
      </div>
      <div class="text-right">
        <h2 class="text-3xl font-black" style="color:#FF6B6B">INVOICE</h2>
        <p class="text-xs opacity-60">{invoice.invoiceNumber}</p>
      </div>
    </div>

    <div class="mt-6 flex justify-between text-xs">
      <div>
        <p class="font-bold uppercase" style="color:#FF6B6B">Bill To</p>
        <p class="mt-1">{invoice.to.name}</p>
        <p class="opacity-60">{invoice.to.address}</p>
      </div>
      <div class="text-right">
        <p>Issued: <span class="font-bold">{invoice.issueDate}</span></p>
        <p>Due: <span class="font-bold">{invoice.dueDate}</span></p>
        <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase rounded-full" style="background:#FFE8E0; color:#FF6B6B">{invoice.status}</span>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="border-b-2 text-left text-xs uppercase" style="border-color:#FF6B6B">
          <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Price</th><th class="pb-2 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-[#eee]">
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-right">{item.qty}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="ml-auto mt-6 w-56 space-y-1 text-sm">
      <div class="flex justify-between opacity-60"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between opacity-60"><span>Discount</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between opacity-60"><span>Tax</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between rounded-lg px-3 py-2 font-bold text-white" style="background:#FF6B6B"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>

    {#if invoice.notes}
      <p class="mt-10 text-xs opacity-50">{invoice.notes}</p>
    {/if}
  </div>

  <div class="h-4 w-full" style="background: linear-gradient(90deg, #FFC371, #FF9E7D, #FF6B6B);"></div>
</div>
