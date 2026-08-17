<script>
  // Tema: Nordic / Earthy — palet warna tanah lembut, tenang, ala desain Skandinavia
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
    notes: "Senang bisa berkarya bersama Anda.",
    status: "unpaid"
  } } = $props();

  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-[#F5F1EA] p-12 md:p-16 font-sans text-[#4A4238]">
  <div class="flex justify-between items-start mb-14">
    <div>
      <div class="w-10 h-10 rounded-full bg-[#A3B18A] mb-4"></div>
      <h1 class="text-2xl font-semibold">{invoice.from.name}</h1>
      <p class="text-xs text-[#4A4238]/50 mt-1">{invoice.from.address}</p>
    </div>
    <div class="text-right text-xs text-[#4A4238]/50">
      <p class="text-[#A3B18A] font-semibold uppercase tracking-wide text-[10px] mb-1">Invoice {invoice.invoiceNumber}</p>
      <p>{invoice.issueDate} → {invoice.dueDate}</p>
      <p class="mt-1 uppercase text-[10px] tracking-widest text-[#4A4238]/40">{invoice.status}</p>
    </div>
  </div>

  <div class="h-px bg-[#A3B18A]/30 mb-10"></div>

  <div class="mb-10">
    <p class="text-[10px] uppercase tracking-widest text-[#4A4238]/40 mb-2">Ditujukan kepada</p>
    <p class="font-semibold text-lg">{invoice.to.name}</p>
    <p class="text-sm text-[#4A4238]/50">{invoice.to.address} · {invoice.to.email}</p>
  </div>

  <div class="space-y-5 mb-10">
    {#each invoice.items as item}
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="w-1.5 h-1.5 rounded-full bg-[#A3B18A]"></div>
          <div>
            <p class="text-sm font-medium">{item.description}</p>
            <p class="text-xs text-[#4A4238]/40">{item.qty} unit × {fmt(item.price, invoice.currency)}</p>
          </div>
        </div>
        <p class="text-sm">{fmt(item.qty * item.price, invoice.currency)}</p>
      </div>
    {/each}
  </div>

  <div class="h-px bg-[#A3B18A]/30 mb-6"></div>

  <div class="flex justify-end">
    <div class="w-64 text-sm">
      <div class="flex justify-between py-1 text-[#4A4238]/50"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
      <div class="flex justify-between py-1 text-[#4A4238]/50"><span>Pajak {invoice.taxPercent}%</span><span>{fmt(tax, invoice.currency)}</span></div>
      <div class="flex justify-between pt-3 mt-2 text-xl font-semibold text-[#606C38]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
    </div>
  </div>

  {#if invoice.notes}
    <p class="text-sm text-[#4A4238]/50 mt-12">{invoice.notes}</p>
  {/if}
</div>
