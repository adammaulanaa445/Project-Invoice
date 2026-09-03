<script>
  let { invoice } = $props();
</script>

<div class="w-[794px] min-h-[1123px] bg-[#faf9ff] text-slate-800 p-12">
  <!-- HEADER -->
  <div class="flex justify-between items-start">
    <div>
      {#if invoice.logoUrl}
        <img
          src={invoice.logoUrl}
          alt="Logo"
          class="w-16 h-16 object-contain rounded-xl mb-5"
        />
      {/if}

      <h2 class="text-2xl font-bold">
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
      <div class="inline-block bg-purple-600 text-white px-6 py-3 rounded-2xl">
        <p class="text-xs uppercase tracking-[3px] opacity-70">
          Invoice
        </p>

        <p class="text-2xl font-black mt-1">
          {invoice.invoiceNumber}
        </p>
      </div>

      <p class="text-sm text-slate-400 mt-4">
        {invoice.issueDate}
      </p>
    </div>
  </div>

  <!-- PURPLE DIVIDER -->
  <div class="h-1 bg-purple-600 rounded-full my-10"></div>

  <!-- BILLING -->
  <div class="grid grid-cols-2 gap-10 mb-10">
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
      <p class="text-xs uppercase tracking-widest text-purple-600 font-bold mb-3">
        From
      </p>

      <h3 class="font-bold">
        {invoice.from.name}
      </h3>

      <p class="text-sm text-slate-500 mt-2">
        {invoice.from.address}
      </p>

      <p class="text-sm text-slate-500">
        {invoice.from.phone}
      </p>
    </div>

    <div class="bg-purple-600 text-white rounded-2xl p-6">
      <p class="text-xs uppercase tracking-widest opacity-70 mb-3">
        Bill To
      </p>

      <h3 class="text-lg font-bold">
        {invoice.to.name}
      </h3>

      <p class="text-sm opacity-70 mt-2">
        {invoice.to.address}
      </p>

      <p class="text-sm opacity-70">
        {invoice.to.email}
      </p>
    </div>
  </div>

  <!-- ITEMS -->
  <div class="bg-white rounded-2xl border border-purple-100 overflow-hidden">
    <div class="grid grid-cols-12 px-6 py-4 bg-purple-50 text-purple-700 text-xs font-bold uppercase">
      <div class="col-span-6">Item</div>
      <div class="col-span-2 text-center">Qty</div>
      <div class="col-span-4 text-right">Amount</div>
    </div>

    {#each invoice.items as item}
      <div class="grid grid-cols-12 px-6 py-5 border-t border-slate-100">
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
      <div class="flex justify-between text-sm text-slate-500 py-2">
        <span>Subtotal</span>
        <span>
          {invoice.currency}
          {invoice.items
            .reduce((sum, item) => sum + item.qty * item.price, 0)
            .toLocaleString('id-ID')}
        </span>
      </div>

      <div class="flex justify-between text-sm text-slate-500 py-2">
        <span>Tax</span>
        <span>{invoice.taxPercent}%</span>
      </div>

      <div class="flex justify-between items-center bg-slate-900 text-white rounded-2xl px-6 py-5 mt-3">
        <span class="font-semibold">Total</span>

        <span class="text-lg font-black">
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

  <!-- NOTES -->
  <div class="mt-12">
    <p class="text-xs uppercase tracking-widest text-purple-600 font-bold mb-2">
      Thank You
    </p>

    <p class="text-sm text-slate-500">
      {invoice.notes}
    </p>
  </div>
</div>