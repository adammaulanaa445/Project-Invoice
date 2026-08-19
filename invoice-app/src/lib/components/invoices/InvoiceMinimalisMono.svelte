<script>
  // === Invoice #16: "Minimalis Mono" ===
  // Palette: hampir tanpa warna, watermark angka besar transparan
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

<div class="relative max-w-[820px] mx-auto overflow-hidden bg-white dark:bg-slate-800 px-12 py-14 text-[#1A1A1A] dark:text-white shadow-sm">
  <span class="pointer-events-none absolute -right-4 -top-6 text-[110px] font-thin leading-none tracking-tighter text-[#F2F2F2] dark:text-slate-700 select-none">
    {invoice.invoiceNumber.split('-').pop()}
  </span>

  <div class="relative">
    <div class="flex items-center justify-between">
      <p class="text-xs uppercase tracking-[0.35em] text-[#999] dark:text-slate-400">Invoice</p>
      <span class="text-xs uppercase px-2 py-0.5 border border-current text-[#999] dark:text-slate-400">{invoice.status}</span>
    </div>
    {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mt-2" />{/if}
    <h1 class="mt-2 text-4xl font-light tracking-tight">{invoice.from.name}</h1>
    <p class="mt-1 text-sm font-light text-[#777] dark:text-slate-300">{invoice.from.address}</p>

    <div class="mt-12 grid grid-cols-2 gap-8 border-t border-[#E5E5E5] dark:border-slate-600 pt-6 text-sm font-light">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-[#999] dark:text-slate-400">Kepada</p>
        <p class="mt-1">{invoice.to.name}</p>
        <p class="text-[#777] dark:text-slate-300">{invoice.to.address}</p>
      </div>
      <div class="text-right">
        <p class="text-xs uppercase tracking-[0.2em] text-[#999] dark:text-slate-400">Nomor · Tanggal</p>
        <p class="mt-1">{invoice.invoiceNumber}</p>
        <p class="text-[#777] dark:text-slate-300">{invoice.issueDate} — jatuh tempo {invoice.dueDate}</p>
      </div>
    </div>

    <div class="mt-10">
      <div class="flex justify-between border-b border-[#1A1A1A] dark:border-white pb-2 text-xs uppercase tracking-[0.2em] text-[#999] dark:text-slate-400">
        <span>Deskripsi</span><span>Jumlah</span>
      </div>
      {#each invoice.items as item}
        <div class="flex justify-between border-b border-[#F0F0F0] dark:border-slate-700 py-4 text-sm font-light">
          <div>
            <p>{item.description}</p>
            <p class="text-xs text-[#999] dark:text-slate-400">{item.qty} × {fmt(item.price, invoice.currency)}</p>
          </div>
          <span>{fmt(item.qty * item.price, invoice.currency)}</span>
        </div>
      {/each}
    </div>

    <div class="ml-auto mt-8 w-56 space-y-1 text-sm font-light">
      <div class="flex justify-between text-[#777] dark:text-slate-300"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-[#777] dark:text-slate-300"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-[#777] dark:text-slate-300"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-3 text-lg"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>

    {#if invoice.notes}
      <p class="mt-14 text-xs font-light leading-relaxed text-[#999] dark:text-slate-400">{invoice.notes}</p>
    {/if}
  </div>
</div>
