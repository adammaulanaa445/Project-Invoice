<script>
  // Tema: Dark Mode Tech — background gelap, aksen neon, mono font, kesan startup/dashboard SaaS
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
    notes: "Butuh bantuan? Balas email ini kapan saja.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#0B0F14] p-10 md:p-14 font-mono text-[#D6E4E5] rounded-xl border border-[#1F2A33]">
  <!-- Header ala terminal window -->
  <div class="flex items-center gap-2 mb-8">
    <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
    <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
    <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
    <span class="ml-3 text-xs text-[#5C6B73]">invoice_{invoice.invoiceNumber}.json</span>
  </div>

  <div class="flex justify-between items-start mb-8">
    <div>
      <h1 class="text-xl text-[#4AF6C3]">$ invoice --generate</h1>
      <p class="text-xs text-[#5C6B73] mt-1">{invoice.from.name} · {invoice.from.email}</p>
    </div>
    <span class="text-xs px-2.5 py-1 rounded border border-[#4AF6C3]/40 text-[#4AF6C3] uppercase">{invoice.status}</span>
  </div>

  <!-- Meta info ala key-value -->
  <div class="text-xs text-[#5C6B73] mb-8 space-y-1">
    <p><span class="text-[#4AF6C3]">invoice_no:</span> {invoice.invoiceNumber}</p>
    <p><span class="text-[#4AF6C3]">issued_at:</span> {invoice.issueDate}</p>
    <p><span class="text-[#4AF6C3]">due_at:</span> {invoice.dueDate}</p>
    <p><span class="text-[#4AF6C3]">billed_to:</span> {invoice.to.name} ({invoice.to.email})</p>
  </div>

  <!-- Item list ala array -->
  <div class="border border-[#1F2A33] rounded-lg overflow-hidden mb-8">
    <div class="grid grid-cols-[1fr_60px_120px_140px] text-[10px] uppercase tracking-wide text-[#5C6B73] bg-[#111820] px-4 py-2">
      <span>item</span><span class="text-center">qty</span><span class="text-right">price</span><span class="text-right">total</span>
    </div>
    {#each invoice.items as item, i}
      <div class="grid grid-cols-[1fr_60px_120px_140px] px-4 py-3 text-sm {i % 2 === 0 ? '' : 'bg-[#111820]/50'}">
        <span>{item.description}</span>
        <span class="text-center text-[#5C6B73]">{item.qty}</span>
        <span class="text-right text-[#5C6B73]">{fmt(item.price, invoice.currency)}</span>
        <span class="text-right text-[#4AF6C3]">{fmt(item.qty * item.price, invoice.currency)}</span>
      </div>
    {/each}
  </div>

  <!-- Total ala output console -->
  <div class="flex justify-end">
    <div class="w-64 text-sm">
      <div class="flex justify-between py-1 text-[#5C6B73]"><span>subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1 text-[#5C6B73]"><span>tax({invoice.taxPercent}%)</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-3 mt-2 border-t border-[#4AF6C3]/40 text-lg text-[#4AF6C3]"><span>total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-xs text-[#5C6B73] mt-8">// {invoice.notes}</p>
  {/if}
</div>
