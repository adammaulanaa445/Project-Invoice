<script>
  let { invoice } = $props();
</script>

<div class="w-[794px] min-h-[1123px] bg-white text-slate-900 p-12">
  <!-- HEADER -->
  <div class="flex justify-between items-start border-b-4 border-blue-600 pb-8">
    <div>
      {#if invoice.logoUrl}
        <img
          src={invoice.logoUrl}
          alt="Logo"
          class="w-16 h-16 object-contain mb-4"
        />
      {/if}

      <h2 class="text-2xl font-black">
        {invoice.from.name}
      </h2>

      <p class="text-sm text-slate-500 mt-2">
        {invoice.from.address}
      </p>

      <p class="text-sm text-slate-500">
        {invoice.from.email}
      </p>
    </div>

    <div class="text-right">
      <div class="text-blue-600 font-black text-5xl tracking-tight">
        INVOICE
      </div>

      <p class="text-lg font-semibold mt-2">
        #{invoice.invoiceNumber}
      </p>
    </div>
  </div>

  <!-- INFO -->
  <div class="grid grid-cols-2 gap-10 py-10">
    <div>
      <p class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
        Billed To
      </p>

      <h3 class="text-xl font-bold">
        {invoice.to.name}
      </h3>

      <p class="text-sm text-slate-500 mt-2">
        {invoice.to.address}
      </p>

      <p class="text-sm text-slate-500">
        {invoice.to.email}
      </p>
    </div>

    <div class="text-right">
      <div class="mb-4">
        <p class="text-xs text-slate-400 uppercase">Issue Date</p>
        <p class="font-semibold">{invoice.issueDate}</p>
      </div>

      <div>
        <p class="text-xs text-slate-400 uppercase">Due Date</p>
        <p class="font-semibold">{invoice.dueDate}</p>
      </div>
    </div>
  </div>

  <!-- TABLE -->
  <div class="rounded-xl overflow-hidden border border-slate-200">
    <div class="grid grid-cols-12 bg-blue-600 text-white px-5 py-4 text-xs font-bold uppercase">
      <div class="col-span-6">Description</div>
      <div class="col-span-2 text-center">Qty</div>
      <div class="col-span-4 text-right">Amount</div>
    </div>

    {#each invoice.items as item}
      <div class="grid grid-cols-12 px-5 py-5 border-b border-slate-100">
        <div class="col-span-6 font-medium">
          {item.description}
        </div>

        <div class="col-span-2 text-center text-slate-500">
          {item.qty}
        </div>

        <div class="col-span-4 text-right font-semibold">
          {invoice.currency}
          {(item.qty * item.price).toLocaleString('id-ID')}
        </div>
      </div>
    {/each}
  </div>

  <!-- TOTAL -->
  <div class="flex justify-end mt-8">
    <div class="w-80">
      <div class="flex justify-between py-2 text-sm text-slate-500">
        <span>Subtotal</span>
        <span>
          {invoice.currency}
          {invoice.items
            .reduce((sum, item) => sum + item.qty * item.price, 0)
            .toLocaleString('id-ID')}
        </span>
      </div>

      <div class="flex justify-between py-2 text-sm text-slate-500">
        <span>Tax</span>
        <span>{invoice.taxPercent}%</span>
      </div>

      <div class="flex justify-between bg-blue-600 text-white rounded-xl px-5 py-4 mt-3 font-bold">
        <span>Total</span>
        <span>
          {invoice.currency}
          {(
            invoice.items.reduce(
              (sum, item) => sum + item.qty * item.price,
              0
            ) *
            (1 + invoice.taxPercent / 100) *
            (1 - invoice.discountPercent / 100)
          ).toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="mt-16 pt-6 border-t border-slate-200">
    <p class="text-xs font-bold uppercase text-blue-600 mb-2">
      Notes
    </p>

    <p class="text-sm text-slate-500">
      {invoice.notes}
    </p>
  </div>
</div>