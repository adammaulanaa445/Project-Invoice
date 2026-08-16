<script>
  let { invoice = {
    invoiceNumber: "INV-0001", issueDate: "2026-08-14", dueDate: "2026-08-28",
    currency: "IDR", logoUrl: "",
    from: { name: "Nexora Labs", address: "Jl. Merdeka No.1, Surabaya", email: "billing@nexora.io", phone: "08123456789" },
    to: { name: "Budi Santoso", address: "Jl. Sudirman No.5, Jakarta", email: "budi@klien.com" },
    items: [
      { description: "SaaS Subscription — Pro Plan", qty: 1, price: 1500000 },
      { description: "API Usage Overage", qty: 2, price: 500000 }
    ],
    taxPercent: 11, discountPercent: 0,
    notes: "Auto-generated invoice. Reply to billing@nexora.io for questions.",
    status: "unpaid"
  } } = $props();
  let subtotal = $derived(invoice.items.reduce((s, i) => s + i.qty * i.price, 0));
  let tax = $derived(subtotal * (invoice.taxPercent / 100));
  let total = $derived(subtotal + tax);
  const fmt = (n, cur) => new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
</script>

<div class="max-w-[820px] mx-auto bg-white font-sans shadow-sm">
  <div class="bg-[#0F172A] text-white px-10 py-8 flex justify-between items-start" style="background-image: linear-gradient(0deg, rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px); background-size: 24px 24px;">
    <div>
      <div class="w-8 h-8 rounded bg-[#38BDF8] mb-3"></div>
      <p class="font-semibold tracking-tight">{invoice.from.name}</p>
      <p class="text-[#94A3B8] text-xs">{invoice.from.email}</p>
    </div>
    <div class="text-right">
      <h1 class="text-2xl font-bold tracking-tight text-[#38BDF8]">INVOICE</h1>
      <p class="text-[#94A3B8] text-xs mt-1">{invoice.invoiceNumber}</p>
    </div>
  </div>

  <div class="px-10 py-8">
    <div class="grid grid-cols-3 gap-4 text-sm mb-8">
      <div class="border-l-2 border-[#38BDF8] pl-3">
        <p class="text-slate-400 text-xs uppercase">Billed To</p>
        <p class="font-semibold text-slate-800">{invoice.to.name}</p>
      </div>
      <div class="border-l-2 border-slate-200 pl-3">
        <p class="text-slate-400 text-xs uppercase">Issued</p>
        <p class="font-semibold text-slate-800">{invoice.issueDate}</p>
      </div>
      <div class="border-l-2 border-slate-200 pl-3">
        <p class="text-slate-400 text-xs uppercase">Due</p>
        <p class="font-semibold text-slate-800">{invoice.dueDate}</p>
      </div>
    </div>

    <table class="w-full text-sm">
      <thead>
        <tr class="text-slate-400 text-xs uppercase border-b border-slate-200">
          <th class="text-left py-2 font-medium">Item</th>
          <th class="text-center py-2 font-medium">Qty</th>
          <th class="text-right py-2 font-medium">Rate</th>
          <th class="text-right py-2 font-medium">Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each invoice.items as item}
          <tr class="border-b border-slate-100">
            <td class="py-3 text-slate-700">{item.description}</td>
            <td class="py-3 text-center">{item.qty}</td>
            <td class="py-3 text-right">{fmt(item.price, invoice.currency)}</td>
            <td class="py-3 text-right font-mono font-semibold text-slate-900">{fmt(item.qty * item.price, invoice.currency)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="flex justify-end mt-5">
      <div class="w-64 text-sm space-y-1.5 font-mono">
        <div class="flex justify-between text-slate-500"><span>Subtotal</span><span>{fmt(subtotal, invoice.currency)}</span></div>
        <div class="flex justify-between text-slate-500"><span>Tax</span><span>{fmt(tax, invoice.currency)}</span></div>
        <div class="flex justify-between font-bold text-base pt-2 border-t border-[#38BDF8] text-[#0F172A]"><span>Total</span><span>{fmt(total, invoice.currency)}</span></div>
      </div>
    </div>
    {#if invoice.notes}<p class="text-xs text-slate-400 mt-8">{invoice.notes}</p>{/if}
  </div>
</div>