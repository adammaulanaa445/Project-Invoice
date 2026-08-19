<script>
  // === Invoice #14: "Swiss Grid" ===
  // Palette: putih & hitam dengan aksen merah tegas
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

<div class="max-w-[820px] mx-auto flex bg-white dark:bg-slate-800 text-[#111111] dark:text-white shadow-sm">
  <div class="flex w-20 flex-shrink-0 flex-col justify-between bg-[#111111] py-8 text-white">
    <span class="mx-auto origin-center -rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em]">Invoice</span>
    <span class="mx-auto -rotate-90 whitespace-nowrap text-xs font-bold text-[#E63946]">{invoice.invoiceNumber}</span>
  </div>

  <div class="flex-1 px-10 py-10">
    <div class="grid grid-cols-12 gap-x-4 border-b border-[#111111] dark:border-white/40 pb-6">
      <div class="col-span-7">
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-2" />{/if}
        <h1 class="text-3xl font-black uppercase leading-none tracking-tight">{invoice.from.name}</h1>
        <p class="mt-2 text-xs uppercase tracking-wide text-[#555] dark:text-slate-300">{invoice.from.address}</p>
      </div>
      <div class="col-span-5 text-right text-xs uppercase tracking-wide text-[#555] dark:text-slate-300">
        <p>Terbit — {invoice.issueDate}</p>
        <p class="font-bold text-[#E63946]">Jatuh tempo — {invoice.dueDate}</p>
        <span class="inline-block mt-1 px-2 py-0.5 text-[10px] normal-case border border-current">{invoice.status}</span>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-12 gap-x-4">
      <div class="col-span-1 text-xs font-bold uppercase text-[#E63946]">To</div>
      <div class="col-span-11">
        <p class="font-bold">{invoice.to.name}</p>
        <p class="text-xs text-[#555] dark:text-slate-300">{invoice.to.address}</p>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="bg-[#111111] text-left text-xs uppercase tracking-wide text-white">
          <th class="px-3 py-2 font-bold">Deskripsi</th><th class="px-3 py-2 text-right font-bold">Qty</th><th class="px-3 py-2 text-right font-bold">Harga</th><th class="px-3 py-2 text-right font-bold">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item, i}
          <tr class={i % 2 === 1 ? 'bg-[#F5F5F5] dark:bg-slate-700' : ''}>
            <td class="px-3 py-2">{item.description}</td>
            <td class="px-3 py-2 text-right">{item.qty}</td>
            <td class="px-3 py-2 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="px-3 py-2 text-right font-bold">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mt-6 flex justify-end">
      <div class="w-64">
        <div class="flex justify-between px-3 py-1 text-sm text-[#555] dark:text-slate-300"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        {#if invoice.discountPercent > 0}
          <div class="flex justify-between px-3 py-1 text-sm text-[#555] dark:text-slate-300"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
        {/if}
        <div class="flex justify-between px-3 py-1 text-sm text-[#555] dark:text-slate-300"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between bg-[#E63946] px-3 py-3 text-base font-black text-white"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>

    {#if invoice.notes}
      <p class="mt-10 text-xs uppercase tracking-wide text-[#555] dark:text-slate-300">{invoice.notes}</p>
    {/if}
  </div>
</div>
