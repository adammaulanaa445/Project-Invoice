<script>
  // Tema: Editorial / Koran — layout ala halaman koran/majalah, serif tebal, garis kolom vertikal
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
    notes: "Diterbitkan sebagai bukti tagihan resmi antara kedua belah pihak.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<!-- Opsional: font "Playfair Display" untuk judul + "Source Serif Pro" untuk isi akan memperkuat kesan editorial -->
<div class="max-w-[820px] mx-auto bg-white p-10 md:p-14 text-[#1A1A1A]" style="font-family: Georgia, 'Times New Roman', serif;">
  <!-- Masthead ala koran -->
  <div class="text-center border-b-4 border-black pb-4 mb-2">
    <p class="text-[10px] uppercase tracking-[0.3em] text-black/50">Edisi Tagihan · No. {invoice.invoiceNumber}</p>
    <h1 class="text-5xl font-black tracking-tight mt-1">THE INVOICE</h1>
  </div>
  <div class="flex justify-between text-[10px] uppercase tracking-wide text-black/50 border-b border-black pb-3 mb-8">
    <span>Terbit {invoice.issueDate}</span>
    <span>{invoice.from.name}</span>
    <span>Tempo {invoice.dueDate}</span>
  </div>

  <!-- Layout 2 kolom ala artikel -->
  <div class="grid grid-cols-[1fr_auto_1fr] gap-6 mb-10">
    <div>
      <p class="text-xs font-bold uppercase border-b border-black/20 pb-1 mb-2">Diterbitkan Untuk</p>
      <p class="font-bold">{invoice.to.name}</p>
      <p class="text-sm text-black/60 leading-relaxed">{invoice.to.address}</p>
      <p class="text-sm text-black/60">{invoice.to.email}</p>
    </div>
    <div class="w-px bg-black/20"></div>
    <div>
      <p class="text-xs font-bold uppercase border-b border-black/20 pb-1 mb-2">Status</p>
      <p class="text-2xl font-black uppercase">{invoice.status}</p>
      <p class="text-sm text-black/60 mt-1">Segera lakukan pembayaran sebelum tanggal jatuh tempo untuk menghindari keterlambatan.</p>
    </div>
  </div>

  <!-- Tabel ala kolom berita -->
  <div class="border-t-2 border-black">
    {#each invoice.items as item, i}
      <div class="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-baseline py-3 border-b border-black/15">
        <span class="text-2xl font-black text-black/20">{String(i + 1).padStart(2, '0')}</span>
        <span class="font-semibold">{item.description}</span>
        <span class="text-sm text-black/50">{item.qty} × {fmt(item.price, invoice.currency)}</span>
        <span class="font-bold">{fmt(item.qty * item.price, invoice.currency)}</span>
      </div>
    {/each}
  </div>

  <div class="flex justify-end mt-8 mb-10">
    <div class="w-72 text-sm">
      <div class="flex justify-between py-1"><span class="text-black/60">Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1 border-b-2 border-black pb-3"><span class="text-black/60">Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-3 text-3xl font-black"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-xs text-black/50 text-center italic border-t border-black/20 pt-4">"{invoice.notes}"</p>
  {/if}
</div>
