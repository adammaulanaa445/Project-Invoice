<script>
  // === Invoice #11: "Curved Teal" ===
  // Palette: cream header (#F5EFC8), teal body (#3E7C74), white text
  // Signature: lengkungan (wave) SVG antara header krem dan body teal
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

<div class="max-w-[820px] mx-auto rounded-2xl overflow-hidden bg-[#3E7C74] text-white shadow-lg">
  <!-- Header krem dengan lengkungan -->
  <div class="relative bg-[#F5EFC8] px-10 md:px-14 pb-10 pt-8 text-[#2E5C55]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        {#if invoice.logoUrl}
          <img src={invoice.logoUrl} alt="logo" class="h-8" />
        {:else}
          <div class="h-4 w-4 rounded-full border-2 border-[#2E5C55]"></div>
        {/if}
        <span class="text-sm font-bold uppercase tracking-wide">{invoice.from.name}</span>
      </div>
      <span class="inline-block px-2.5 py-1 text-xs rounded-full {invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-white/70 text-[#2E5C55]'}">{invoice.status}</span>
    </div>
    <svg class="absolute -bottom-1 left-0 h-10 w-full text-[#3E7C74]" viewBox="0 0 700 60" preserveAspectRatio="none">
      <path d="M0,60 Q350,-10 700,60 L700,60 L0,60 Z" fill="currentColor" />
    </svg>
  </div>

  <div class="px-10 md:px-14 py-10">
    <div class="flex items-start justify-between">
      <p class="text-sm text-[#CFE3DF]">Ditagihkan kepada:</p>
      <div class="text-right">
        <p class="text-xs uppercase tracking-wide text-[#CFE3DF]">No.</p>
        <p class="text-sm font-bold">{invoice.invoiceNumber}</p>
      </div>
    </div>
    <p class="text-lg font-bold">{invoice.to.name}</p>
    <p class="mt-1 text-sm text-[#CFE3DF]">{invoice.to.address}</p>
    <p class="text-sm text-[#CFE3DF]">{invoice.to.email}</p>
    <p class="mt-2 text-xs text-[#CFE3DF]">Terbit: {invoice.issueDate} · Jatuh tempo: {invoice.dueDate}</p>

    <table class="mt-8 w-full text-sm">
      <thead>
        <tr class="border-b-2 border-white/60 text-left uppercase tracking-wide text-[#CFE3DF]">
          <th class="pb-2">Deskripsi</th>
          <th class="pb-2 text-center">Qty</th>
          <th class="pb-2 text-right">Harga</th>
          <th class="pb-2 text-right">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item, i}
          <tr class={i % 2 === 0 ? 'bg-white/10' : ''}>
            <td class="py-3 pl-1">{item.description}</td>
            <td class="py-3 text-center font-bold">{item.qty}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 pr-1 text-right font-bold">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mt-6 flex flex-wrap items-end justify-between gap-6">
      {#if invoice.notes}
        <p class="max-w-xs text-xs text-[#CFE3DF]">{invoice.notes}</p>
      {/if}
      <div class="ml-auto w-56 space-y-1 text-sm">
        <div class="flex justify-between text-[#CFE3DF]"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        {#if invoice.discountPercent > 0}
          <div class="flex justify-between text-[#CFE3DF]"><span>Diskon ({invoice.discountPercent}%)</span><span>-{fmt(discount, invoice.currency)}</span></div>
        {/if}
        <div class="flex justify-between text-[#CFE3DF]"><span>Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="mt-2 flex justify-between rounded-md bg-[#F5EFC8] px-3 py-2 font-bold text-[#2E5C55]">
          <span>Grand Total</span><span>{fmt(total, invoice.currency)}</span>
        </div>
      </div>
    </div>
  </div>
</div>
