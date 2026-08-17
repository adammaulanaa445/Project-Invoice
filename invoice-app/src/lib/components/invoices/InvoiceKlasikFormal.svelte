<script>
  // Tema: Klasik Formal — hitam putih, font serif, garis tegas seperti invoice kantor/notaris jaman dulu
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
    notes: "Terima kasih atas kepercayaan Anda menggunakan jasa kami.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<!--
  Catatan: font serif di bawah pakai fallback sistem (Georgia/Times).
  Kalau mau font serif custom (mis. "Playfair Display"), import dulu di app.html / +layout.svelte:
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
-->
<div class="max-w-[820px] mx-auto bg-white p-10 md:p-14 text-[#1A1A1A]" style="font-family: Georgia, 'Times New Roman', serif;">
  <!-- Header dengan garis ganda ala dokumen resmi -->
  <div class="border-t-4 border-b border-black pt-4 pb-6 mb-8">
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-3xl font-bold tracking-wide uppercase">Invoice</h1>
        <p class="text-xs tracking-widest uppercase text-black/50 mt-1">Dokumen Tagihan Resmi</p>
      </div>
      <div class="text-right text-sm">
        <p class="font-bold">No. {invoice.invoiceNumber}</p>
        <p class="text-black/60">Tanggal: {invoice.issueDate}</p>
        <p class="text-black/60">Jatuh Tempo: {invoice.dueDate}</p>
      </div>
    </div>
    <div class="mt-2 inline-block border border-black px-2 py-0.5 text-[10px] uppercase tracking-wider">{invoice.status}</div>
  </div>

  <!-- Info pihak -->
  <div class="grid grid-cols-2 gap-8 mb-10 text-sm">
    <div>
      <p class="uppercase text-[11px] tracking-wider text-black/50 border-b border-black/30 pb-1 mb-2">Pihak Pertama</p>
      <p class="font-bold">{invoice.from.name}</p>
      <p class="text-black/70 leading-relaxed">{invoice.from.address}</p>
      <p class="text-black/70">{invoice.from.email} · {invoice.from.phone}</p>
    </div>
    <div>
      <p class="uppercase text-[11px] tracking-wider text-black/50 border-b border-black/30 pb-1 mb-2">Pihak Kedua</p>
      <p class="font-bold">{invoice.to.name}</p>
      <p class="text-black/70 leading-relaxed">{invoice.to.address}</p>
      <p class="text-black/70">{invoice.to.email}</p>
    </div>
  </div>

  <!-- Tabel item -->
  <table class="w-full text-sm border-collapse mb-8">
    <thead>
      <tr class="border-t-2 border-b-2 border-black">
        <th class="text-left py-2 font-bold uppercase text-xs tracking-wide">Deskripsi</th>
        <th class="text-center py-2 font-bold uppercase text-xs tracking-wide w-20">Qty</th>
        <th class="text-right py-2 font-bold uppercase text-xs tracking-wide w-32">Harga</th>
        <th class="text-right py-2 font-bold uppercase text-xs tracking-wide w-32">Jumlah</th>
      </tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr class="border-b border-black/20">
          <td class="py-2.5">{item.description}</td>
          <td class="py-2.5 text-center">{item.qty}</td>
          <td class="py-2.5 text-right">{fmt(item.price, invoice.currency)}</td>
          <td class="py-2.5 text-right font-semibold">{fmt(item.qty * item.price, invoice.currency)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Total -->
  <div class="flex justify-end mb-10">
    <div class="w-72 text-sm">
      <div class="flex justify-between py-1.5"><span class="text-black/60">Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1.5 border-b border-black/30"><span class="text-black/60">Pajak ({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between py-2.5 text-lg font-bold border-b-4 border-black"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-sm text-black/70 italic border-l-2 border-black/30 pl-4">{invoice.notes}</p>
  {/if}

  <div class="mt-14 flex justify-between text-xs text-black/40">
    <span>Dibuat secara elektronik</span>
    <span>Halaman 1/1</span>
  </div>
</div>
