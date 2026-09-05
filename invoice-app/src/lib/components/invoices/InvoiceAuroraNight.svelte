<script>
  // === "Aurora Night" — banner gradasi biru-oranye ala aurora di header,
  // badge logo bulat, latar gelap penuh. Terinspirasi invoice studio digital modern.
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

<div class="max-w-[820px] mx-auto overflow-hidden rounded-2xl bg-[#0d0e12] text-[#e8e8ea] shadow-xl">
  <div class="h-28 w-full" style="background: linear-gradient(120deg, #1e3a8a 0%, #0d0e12 45%, #0d0e12 55%, #c2410c 100%);"></div>

  <div class="px-10 md:px-14 py-8">
    <div class="flex items-center justify-between">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-black">
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 w-8 rounded-full object-cover" />{:else}{invoice.from.name.charAt(0)}{/if}
      </div>
      <span class="text-xs text-[#8a8a94]">{invoice.invoiceNumber}</span>
    </div>

    <h1 class="mt-6 text-4xl font-black tracking-tight text-white">Invoice</h1>

    <div class="mt-8 grid grid-cols-3 gap-4 border-t border-[#26262e] pt-5 text-xs">
      <div>
        <p class="uppercase text-[#8a8a94]">From</p>
        <p class="mt-1 font-bold text-white">{invoice.from.name}</p>
        <p class="mt-1 text-[#8a8a94]">{invoice.from.address}</p>
        {#if invoice.from.email}<p class="text-[#8a8a94]">{invoice.from.email}</p>{/if}
      </div>
      <div>
        <p class="uppercase text-[#8a8a94]">Bill To</p>
        <p class="mt-1 font-bold text-white">{invoice.to.name}</p>
        <p class="mt-1 text-[#8a8a94]">{invoice.to.address}</p>
      </div>
      <div class="text-right">
        <p class="uppercase text-[#8a8a94]">Issued</p>
        <p class="mt-1 text-white">{invoice.issueDate}</p>
        <p class="mt-2 uppercase text-[#8a8a94]">Due</p>
        <p class="mt-1 text-white">{invoice.dueDate}</p>
        <span class="inline-block mt-2 px-2 py-0.5 text-[10px] uppercase rounded-full border border-white/20 text-[#8a8a94]">{invoice.status}</span>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="text-left text-xs uppercase tracking-wide text-[#8a8a94]">
          <th class="pb-2">Description</th><th class="pb-2 text-right">Qty</th><th class="pb-2 text-right">Rate</th><th class="pb-2 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-t border-[#26262e]">
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-right text-[#8a8a94]">{item.qty}</td>
            <td class="py-3 text-right text-[#8a8a94]">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right font-bold text-white">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="ml-auto mt-6 w-56 space-y-1 border-t border-[#26262e] pt-3 text-sm">
      <div class="flex justify-between text-[#8a8a94]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-[#8a8a94]"><span>Discount ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-[#8a8a94]"><span>Tax ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-1 font-bold text-white"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>

    {#if invoice.notes}
      <div class="mt-10 text-xs text-[#8a8a94]">
        <p class="uppercase text-[#5c5c66]">Notes</p>
        <p class="mt-1">{invoice.notes}</p>
      </div>
    {/if}
  </div>
</div>
