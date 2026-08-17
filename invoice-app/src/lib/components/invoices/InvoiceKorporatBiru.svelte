<script>
  // Tema: Korporat Biru — header blok warna solid, terkesan formal & tepercaya, cocok invoice B2B
  let { invoice = {
    invoiceNumber: "INV-0001", issueDate: "2026-08-14", dueDate: "2026-08-28",
    currency: "IDR", logoUrl: "",
    from: { name: "Studio Kata", address: "Jl. Merdeka No.1, Surabaya", email: "hi@studiokata.co", phone: "08123456789" },
    to: { name: "Budi Santoso", address: "Jl. Sudirman No.5, Jakarta", email: "budi@klien.com" },
    items: [
      { description: "Ilustrasi Karakter", qty: 1, price: 1500000 },
      { description: "Revisi & Finishing", qty: 2, price: 500000 }
    ],
    taxPercent: 11, discountPercent: 0,
    notes: "Mohon lakukan pembayaran sebelum tanggal jatuh tempo.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-white font-sans text-[#1E293B] shadow-sm">
  <!-- Header blok biru solid -->
  <div class="bg-[#1D4ED8] text-white px-10 md:px-14 py-8 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold">{invoice.from.name}</h1>
      <p class="text-white/70 text-xs mt-1">{invoice.from.email} · {invoice.from.phone}</p>
    </div>
    <div class="text-right">
      <p class="text-xs uppercase tracking-widest text-white/70">Invoice</p>
      <p class="text-xl font-bold">{invoice.invoiceNumber}</p>
    </div>
  </div>

  <div class="px-10 md:px-14 py-10">
    <!-- Status & tanggal -->
    <div class="flex justify-between items-center mb-8">
      <span class="inline-block bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">{invoice.status}</span>
      <div class="text-right text-xs text-[#1E293B]/60">
        <p>Terbit: {invoice.issueDate}</p>
        <p>Jatuh tempo: {invoice.dueDate}</p>
      </div>
    </div>

    <!-- Info klien -->
    <div class="bg-[#F1F5F9] rounded-lg p-5 mb-8">
      <p class="text-[11px] uppercase tracking-wide text-[#1D4ED8] font-semibold mb-2">Ditagihkan Kepada</p>
      <p class="font-bold">{invoice.to.name}</p>
      <p class="text-sm text-[#1E293B]/60">{invoice.to.address}</p>
      <p class="text-sm text-[#1E293B]/60">{invoice.to.email}</p>
    </div>

    <!-- Tabel item -->
    <table class="w-full text-sm mb-8">
      <thead>
        <tr class="text-left text-[11px] uppercase tracking-wide text-[#1E293B]/50 border-b-2 border-[#1E293B]/10">
          <th class="py-2 font-semibold">Deskripsi</th>
          <th class="py-2 font-semibold text-center">Qty</th>
          <th class="py-2 font-semibold text-right">Harga</th>
          <th class="py-2 font-semibold text-right">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-[#1E293B]/8">
            <td class="py-3">{item.description}</td>
            <td class="py-3 text-center">{item.qty}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right font-semibold">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Total -->
    <div class="flex justify-end">
      <div class="w-72 text-sm">
        <div class="flex justify-between py-1.5"><span class="text-[#1E293B]/60">Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between py-1.5"><span class="text-[#1E293B]/60">Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between py-3 mt-1 bg-[#1D4ED8] text-white px-4 rounded-lg text-base font-bold"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>

    {#if invoice.notes}
      <p class="text-sm text-[#1E293B]/60 mt-8 border-t border-[#1E293B]/10 pt-4">{invoice.notes}</p>
    {/if}
  </div>
</div>
