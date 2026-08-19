<script>
  // === Invoice #15: "Motif Warm" ===
  // Palette: indigo tua (#1B2A4A) & emas (#C9962C), pita diagonal geometris
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
  <div class="h-3 w-full" style="background-image: repeating-linear-gradient(45deg, #C9962C 0, #C9962C 6px, #1B2A4A 6px, #1B2A4A 12px);"></div>

  <div class="px-10 md:px-14 py-10 text-[#1B2A4A]">
    <div class="flex items-start justify-between">
      <div>
        {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-2" />{/if}
        <h1 class="font-serif text-3xl font-bold">{invoice.from.name}</h1>
        <p class="mt-1 text-sm text-[#5B6785]">{invoice.from.address}</p>
      </div>
      <div class="text-right">
        <p class="font-serif text-lg font-bold text-[#C9962C]">Invoice</p>
        <p class="text-sm">{invoice.invoiceNumber}</p>
        <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase rounded-full {invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-[#F5EDD8] text-[#C9962C]'}">{invoice.status}</span>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-6 rounded-lg border border-[#E4D9BC] bg-[#FBF7ED] p-5 text-sm">
      <div>
        <p class="text-xs uppercase tracking-wide text-[#C9962C]">Ditagihkan kepada</p>
        <p class="mt-1 font-bold">{invoice.to.name}</p>
        <p class="text-[#5B6785]">{invoice.to.address}</p>
      </div>
      <div class="text-right">
        <p><span class="text-xs uppercase tracking-wide text-[#C9962C]">Terbit</span></p>
        <p class="font-bold">{invoice.issueDate}</p>
        <p class="mt-2"><span class="text-xs uppercase tracking-wide text-[#C9962C]">Jatuh tempo</span></p>
        <p class="font-bold">{invoice.dueDate}</p>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="border-b-2 border-[#1B2A4A] text-left">
          <th class="py-2 font-serif">Deskripsi</th><th class="py-2 text-right font-serif">Qty</th><th class="py-2 text-right font-serif">Harga</th><th class="py-2 text-right font-serif">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-[#E4D9BC]">
            <td class="py-2">{item.description}</td>
            <td class="py-2 text-right">{item.qty}</td>
            <td class="py-2 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-2 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="ml-auto mt-6 w-60 text-sm">
      <div class="flex justify-between py-1 text-[#5B6785]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between py-1 text-[#5B6785]"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between py-1 text-[#5B6785]"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between border-t-2 border-[#C9962C] py-2 text-base font-bold text-[#1B2A4A]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>

    {#if invoice.notes}
      <p class="mt-10 border-t border-[#E4D9BC] pt-4 text-xs italic text-[#5B6785]">{invoice.notes}</p>
    {/if}
  </div>

  <div class="h-3 w-full" style="background-image: repeating-linear-gradient(45deg, #C9962C 0, #C9962C 6px, #1B2A4A 6px, #1B2A4A 12px);"></div>
</div>
