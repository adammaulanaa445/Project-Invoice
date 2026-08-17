<script>
  // Tema: Elegan Emas Mewah — latar gelap, aksen emas, cocok untuk jasa premium/luxury
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
    notes: "Sebuah kehormatan bisa bekerja sama dengan Anda.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<!--
  Opsional: font serif elegan seperti "Cormorant Garamond" atau "Playfair Display" akan makin memperkuat kesan mewah.
  Import via Google Fonts di layout utama project.
-->
<div class="max-w-[820px] mx-auto bg-[#0F0F0F] p-12 md:p-16 text-[#EDE4D3]" style="font-family: 'Cormorant Garamond', Georgia, serif;">
  <div class="text-center mb-10">
    <p class="text-[10px] tracking-[0.4em] uppercase text-[#C9A24B] mb-2">Invoice</p>
    <h1 class="text-4xl font-semibold text-[#EDE4D3]">{invoice.from.name}</h1>
    <div class="w-16 h-px bg-[#C9A24B] mx-auto mt-4"></div>
  </div>

  <div class="flex justify-between text-sm mb-10 text-[#EDE4D3]/70">
    <div>
      <p class="text-[#C9A24B] text-[10px] uppercase tracking-widest mb-1">No. Invoice</p>
      <p>{invoice.invoiceNumber}</p>
    </div>
    <div class="text-right">
      <p class="text-[#C9A24B] text-[10px] uppercase tracking-widest mb-1">Tanggal</p>
      <p>{invoice.issueDate} — {invoice.dueDate}</p>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-8 mb-10 text-sm border-y border-[#C9A24B]/20 py-6">
    <div>
      <p class="text-[#C9A24B] text-[10px] uppercase tracking-widest mb-2">Untuk Yth</p>
      <p class="font-semibold text-base">{invoice.to.name}</p>
      <p class="text-[#EDE4D3]/60">{invoice.to.address}</p>
      <p class="text-[#EDE4D3]/60">{invoice.to.email}</p>
    </div>
    <div class="text-right">
      <span class="inline-block border border-[#C9A24B] text-[#C9A24B] text-[10px] uppercase tracking-widest px-3 py-1">{invoice.status}</span>
    </div>
  </div>

  <div class="space-y-4 mb-10">
    {#each invoice.items as item}
      <div class="flex justify-between items-baseline">
        <div>
          <p class="text-base">{item.description}</p>
          <p class="text-xs text-[#EDE4D3]/40 mt-0.5">{item.qty} × {fmt(item.price, invoice.currency)}</p>
        </div>
        <p class="text-[#C9A24B] font-medium">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <div class="flex justify-end">
    <div class="w-64 text-sm text-[#EDE4D3]/70">
      <div class="flex justify-between py-1"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-4 mt-2 border-t border-[#C9A24B] text-xl text-[#C9A24B]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-center text-sm text-[#EDE4D3]/50 mt-12 italic">{invoice.notes}</p>
  {/if}
</div>
