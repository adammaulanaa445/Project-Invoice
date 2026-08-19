<script>
  // === Invoice #12: "Pixel Receipt" ===
  // Palette: hitam pekat, struk putih dengan tepi bergerigi (zigzag)
  // Signature: tepi zigzag CSS mask + font monospace
  // Mendukung dark mode: di mode gelap, latar luar jadi lebih pekat lagi.
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

<div class="max-w-[420px] mx-auto bg-[#0A0A0A] dark:bg-black p-8 rounded-xl">
  <!-- gerigi atas -->
  <div class="h-4 bg-white" style="mask-image: linear-gradient(135deg, transparent 8px, black 0), linear-gradient(-135deg, transparent 8px, black 0); mask-size: 16px 100%; mask-repeat: repeat-x; mask-position: bottom;"></div>

  <div class="bg-white px-7 py-6 font-mono text-[#0A0A0A]">
    <div class="flex items-center justify-between">
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-6" />{/if}
      <span class="inline-block px-2 py-0.5 text-[10px] uppercase border border-[#0A0A0A] {invoice.status === 'paid' ? 'bg-[#0A0A0A] text-white' : ''}">{invoice.status}</span>
    </div>
    <h1 class="mt-3 text-xl font-black uppercase tracking-tight">{invoice.from.name}</h1>
    <p class="mt-1 text-xs text-[#555]">{invoice.from.address}</p>
    {#if invoice.from.phone}<p class="text-xs text-[#555]">Tel. {invoice.from.phone}</p>{/if}

    <div class="mt-5 flex justify-between text-xs font-bold">
      <span>ORDER</span>
      <span>#{invoice.invoiceNumber}</span>
    </div>
    <p class="text-xs text-[#555]">{invoice.issueDate} — jatuh tempo {invoice.dueDate}</p>

    <div class="mt-4 flex justify-between border-b border-dashed border-[#0A0A0A] pb-1 text-xs font-bold uppercase">
      <span>Qty</span><span>Deskripsi</span><span>Jumlah</span>
    </div>
    <div class="mt-2 space-y-1 text-xs">
      {#each invoice.items as item}
        <div class="flex justify-between gap-2">
          <span class="w-10">{item.qty} x</span>
          <span class="flex-1">{item.description}</span>
          <span>{fmt(item.qty * item.price, invoice.currency)}</span>
        </div>
      {/each}
    </div>

    <div class="mt-4 border-t border-dashed border-[#0A0A0A] pt-3 space-y-1 text-xs">
      <div class="flex justify-between text-[#555]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-[#555]"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-[#555]"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
    </div>

    <div class="mt-3 flex justify-between border-t border-dashed border-[#0A0A0A] pt-3 text-xl font-black uppercase">
      <span>Total :</span><span>{fmt(total, invoice.currency)}</span>
    </div>

    {#if invoice.notes}
      <p class="mt-4 border-t border-dashed border-[#0A0A0A] pt-3 text-[10px] text-[#777]">{invoice.notes}</p>
    {/if}
  </div>

  <!-- gerigi bawah -->
  <div class="h-4 bg-white" style="mask-image: linear-gradient(45deg, transparent 8px, black 0), linear-gradient(-45deg, transparent 8px, black 0); mask-size: 16px 100%; mask-repeat: repeat-x; mask-position: top;"></div>
</div>
