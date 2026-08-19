<script>
  // === Invoice #13: "Ledger" ===
  // Palette: krem seperti kertas buku kas, garis ruled paper di background
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

<div class="max-w-[820px] mx-auto bg-[#FAF7EF] font-mono text-[#2B2E26]">
  <div class="relative border border-[#C9C2A8] px-10 md:px-14 py-12" style="background-image: repeating-linear-gradient(to bottom, transparent, transparent 27px, #D8D2B8 28px);">
    <div class="flex items-start justify-between border-b-2 border-[#2B2E26] pb-6">
      <div>
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-2" />{/if}
        <h1 class="text-2xl font-bold tracking-tight">{invoice.from.name}</h1>
        <p class="mt-1 text-sm text-[#6B6852]">{invoice.from.address}</p>
      </div>
      <div class="flex h-20 w-20 rotate-3 items-center justify-center rounded-full border-2 border-double border-[#7A3B2E] text-center">
        <span class="text-[10px] font-bold uppercase leading-tight text-[#7A3B2E]">No.<br/>{invoice.invoiceNumber}</span>
      </div>
    </div>

    <div class="mt-6 flex justify-between text-sm">
      <div>
        <p class="text-[#6B6852]">Ditagihkan kepada</p>
        <p class="font-bold">{invoice.to.name}</p>
        <p class="text-[#6B6852]">{invoice.to.address}</p>
        <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase border border-[#7A3B2E] text-[#7A3B2E]">{invoice.status}</span>
      </div>
      <div class="text-right">
        <p><span class="text-[#6B6852]">Tanggal terbit</span> — {invoice.issueDate}</p>
        <p><span class="text-[#6B6852]">Jatuh tempo</span> — {invoice.dueDate}</p>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="border-b-2 border-[#2B2E26] text-left uppercase tracking-wide">
          <th class="py-2">Keterangan</th><th class="py-2 text-right">Qty</th><th class="py-2 text-right">Harga</th><th class="py-2 text-right">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-dashed border-[#C9C2A8]">
            <td class="py-2">{item.description}</td>
            <td class="py-2 text-right">{item.qty}</td>
            <td class="py-2 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-2 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="ml-auto mt-6 w-56 text-sm">
      <div class="flex justify-between py-1"><span class="text-[#6B6852]">Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between py-1"><span class="text-[#6B6852]">Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between py-1"><span class="text-[#6B6852]">Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between border-t-2 border-[#2B2E26] py-2 text-base font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>

    {#if invoice.notes}
      <p class="mt-10 border-t border-dashed border-[#C9C2A8] pt-4 text-xs text-[#6B6852]">{invoice.notes}</p>
    {/if}
  </div>
</div>
