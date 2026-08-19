<script>
  // === Invoice #17: "Studio Hitam" ===
  // Palette: hitam pekat, garis putih tebal, judul besar rata kanan
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

<div class="max-w-[820px] mx-auto bg-black px-10 py-10 text-white">
  <div class="h-1 w-full bg-white"></div>

  <div class="mt-6 flex flex-wrap items-start justify-between gap-6 pb-6 text-xs uppercase tracking-wide">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-6 mb-2" />{/if}
      <p class="text-[#8A8A8A]">Dari</p>
      <p class="mt-1 text-sm font-bold">{invoice.from.name}</p>
      <p class="mt-2 text-[#8A8A8A] normal-case">{invoice.from.address}</p>
      {#if invoice.from.email}<p class="text-[#8A8A8A] normal-case">{invoice.from.email}</p>{/if}
    </div>
    <div>
      <p class="text-[#8A8A8A]">Klien</p>
      <p class="mt-1 text-sm font-bold">{invoice.to.name}</p>
      <p class="mt-2 text-[#8A8A8A] normal-case">{invoice.to.address}</p>
    </div>
    <div class="text-right">
      <p class="text-[#8A8A8A]">Tanggal Terbit</p>
      <p class="mt-1 font-bold">{invoice.issueDate}</p>
      <p class="mt-3 text-[#8A8A8A]">Jatuh Tempo</p>
      <p class="mt-1 font-bold">{invoice.dueDate}</p>
      <span class="inline-block mt-2 px-2 py-0.5 text-[10px] normal-case border border-white/40">{invoice.status}</span>
    </div>
  </div>

  <h1 class="text-right text-6xl font-black uppercase tracking-tight">Invoice</h1>

  <div class="mt-6 h-1 w-full bg-white"></div>

  <table class="mt-6 w-full text-sm">
    <thead>
      <tr class="text-left text-xs uppercase tracking-wide text-[#8A8A8A]">
        <th class="pb-3">Item</th><th class="pb-3 text-right">Qty</th><th class="pb-3 text-right">Jumlah</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-t border-[#333]">
          <td class="py-3 font-bold">{item.description}</td>
          <td class="py-3 text-right">{item.qty}</td>
          <td class="py-3 text-right font-bold">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="mt-16 h-1 w-full bg-white"></div>

  <div class="mt-6 flex flex-wrap items-start justify-between gap-6 text-sm">
    {#if invoice.notes}
      <div class="max-w-xs text-xs text-[#8A8A8A]">
        <p class="font-bold uppercase text-white">Instruksi Pembayaran.</p>
        <p class="mt-1">{invoice.notes}</p>
      </div>
    {/if}
    <div class="ml-auto w-56 space-y-2">
      <div class="flex justify-between text-xs uppercase text-[#8A8A8A]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-xs uppercase text-[#8A8A8A]"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-xs uppercase text-[#8A8A8A]"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="h-px w-full bg-[#333]"></div>
      <div class="flex justify-between"><span class="text-xs uppercase text-[#8A8A8A]">Total</span><span class="text-2xl font-black">{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  <div class="mt-6 h-1 w-full bg-white"></div>
</div>
