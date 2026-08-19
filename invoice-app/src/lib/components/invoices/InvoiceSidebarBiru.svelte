<script>
  // === Invoice #20: "Sidebar Biru" ===
  // Palette: sidebar biru solid untuk identitas, area putih untuk isi tagihan
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

<div class="max-w-[820px] mx-auto flex bg-white text-[#1A1A1A] shadow-lg">
  <div class="flex w-48 flex-shrink-0 flex-col justify-between bg-[#1D5A9E] px-6 py-8 text-white">
    <div>
      {#if invoice.logoUrl}<img src={invoice.logoUrl} alt="logo" class="h-8 mb-2" />{/if}
      <p class="font-serif text-2xl italic">{invoice.from.name}</p>
      <p class="mt-1 text-[10px] uppercase tracking-wide text-white/70">{invoice.from.address}</p>
    </div>
    <div class="mt-10 space-y-6 text-xs">
      <div>
        <p class="font-bold uppercase">Metode Pembayaran</p>
        <p class="mt-1 text-white/70">{invoice.notes ?? 'Transfer bank, konfirmasi ke nomor kontak kami.'}</p>
      </div>
      <div>
        <p class="font-bold uppercase">Syarat & Ketentuan</p>
        <p class="mt-1 text-white/70">Pembayaran paling lambat pada tanggal jatuh tempo.</p>
      </div>
      <span class="inline-block px-2 py-0.5 text-[10px] uppercase rounded-full bg-white/20">{invoice.status}</span>
    </div>
  </div>

  <div class="flex-1 px-10 py-8">
    <div class="flex items-start justify-between">
      <div class="text-xs">
        <p class="text-[#777]">Kepada:</p>
        <p class="mt-1 font-bold">{invoice.to.name}</p>
        <p class="text-[#777]">{invoice.to.address}</p>
      </div>
      <div class="text-right">
        <h1 class="text-3xl font-black uppercase text-[#1D5A9E]">Invoice</h1>
        <p class="mt-1 text-xs text-[#777]">No. {invoice.invoiceNumber}</p>
        <p class="text-xs text-[#777]">{invoice.issueDate}</p>
      </div>
    </div>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="border-b-2 border-[#1A1A1A] text-left text-xs uppercase text-[#777]">
          <th class="pb-2">Qty</th><th class="pb-2">Deskripsi</th><th class="pb-2 text-right">Harga</th><th class="pb-2 text-right">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-[#EEE]">
            <td class="py-3 font-bold">{item.qty}</td>
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="ml-auto mt-6 w-56 space-y-1 text-sm">
      <div class="flex justify-between text-[#777]"><span>Sub Total</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      {#if invoice.discountPercent > 0}
        <div class="flex justify-between text-[#777]"><span>Diskon {invoice.discountPercent}%</span><span>-{fmt(discount, invoice.currency)}</span></div>
      {/if}
      <div class="flex justify-between text-[#777]"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="mt-2 flex justify-between bg-[#1D5A9E] px-3 py-2 font-bold text-white"><span>Grand Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
</div>
