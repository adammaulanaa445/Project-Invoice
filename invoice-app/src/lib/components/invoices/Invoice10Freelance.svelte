<script>
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
    notes: "Makasih udah order! Semoga suka hasilnya ✏️",
    status: "unpaid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#FFFDF7] p-10 md:p-14 font-sans text-[#4A4238] border-2 border-dashed border-[#FDBA74] relative">
  <div class="absolute top-6 right-8 rotate-6 border-2 border-[#F97316] text-[#F97316] rounded-lg px-3 py-1 text-xs font-bold uppercase">{invoice.status}</div>

  <h1 class="text-5xl mb-1" style="font-family: 'Caveat', cursive;">Invoice ✏️</h1>
  <p class="text-sm text-[#4A4238]/60 mb-8">#{invoice.invoiceNumber} · {invoice.issueDate}</p>

  <div class="flex justify-between text-sm mb-8">
    <div>
      <p class="text-[#F97316] font-semibold text-xs uppercase mb-1">Dari</p>
      <p class="font-semibold">{invoice.from.name}</p>
      <p class="text-[#4A4238]/60">{invoice.from.email}</p>
    </div>
    <div class="text-right">
      <p class="text-[#F97316] font-semibold text-xs uppercase mb-1">Untuk</p>
      <p class="font-semibold">{invoice.to.name}</p>
      <p class="text-[#4A4238]/60">jatuh tempo {invoice.dueDate}</p>
    </div>
  </div>

  <div class="space-y-3">
    {#each invoice.items as item}
      <div class="flex justify-between items-center border-b-2 border-dotted border-[#4A4238]/20 pb-2">
        <div>
          <p class="font-medium">{item.description}</p>
          <p class="text-xs text-[#4A4238]/50">{item.qty} x {fmt(item.price, invoice.currency)}</p>
        </div>
        <p class="font-bold text-[#F97316]">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <div class="flex justify-end mt-6">
    <div class="w-64 text-sm space-y-1.5">
      <div class="flex justify-between text-[#4A4238]/60"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between text-[#4A4238]/60"><span>Pajak</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between text-2xl pt-2" style="font-family: 'Caveat', cursive;"><span>Total</span><span class="text-[#F97316]">{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>
  {#if invoice.notes}<p class="text-sm text-[#4A4238]/70 mt-8" style="font-family: 'Caveat', cursive; font-size: 1.25rem;">{invoice.notes}</p>{/if}
</div>