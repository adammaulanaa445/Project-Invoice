<script>
  let { invoice } = $props();
</script>

<div class="w-[794px] min-h-[1123px] bg-black text-white overflow-hidden">
  <!-- HEADER -->
  <div class="relative h-[220px] overflow-hidden">
    <div
      class="absolute inset-0"
      style="background:
        radial-gradient(ellipse at 80% 15%, #ff6b35 0%, transparent 32%),
        radial-gradient(ellipse at 20% 80%, #0756a8 0%, transparent 48%),
        linear-gradient(135deg, #020617, #000000);"
    ></div>

    <div
      class="absolute -bottom-24 -left-10 w-[900px] h-[180px] rounded-[50%] border-t-[3px] border-white/20 rotate-[-4deg]"
    ></div>

    <div class="relative z-10 flex justify-between p-12">
      <div>
        {#if invoice.logoUrl}
          <img
            src={invoice.logoUrl}
            alt="Logo"
            class="w-16 h-16 object-contain bg-white rounded-lg p-1 mb-4"
          />
        {:else}
          <div class="text-2xl font-bold">
            {invoice.from.name}
          </div>
        {/if}

        <p class="text-white/60 text-sm">
          {invoice.from.address}
        </p>
      </div>

      <div class="text-right">
        <p class="text-xs uppercase tracking-[4px] text-white/50">
          Invoice
        </p>

        <h1 class="text-4xl font-black mt-2">
          {invoice.invoiceNumber}
        </h1>

        <p class="text-sm text-white/60 mt-2">
          {invoice.issueDate}
        </p>
      </div>
    </div>
  </div>

  <!-- INFORMATION -->
  <div class="px-12 py-10">
    <div class="grid grid-cols-2 gap-10 mb-10">
      <div>
        <p class="text-xs uppercase tracking-widest text-white/40 mb-2">
          Bill To
        </p>

        <h2 class="text-lg font-bold">
          {invoice.to.name}
        </h2>

        <p class="text-sm text-white/60 mt-1">
          {invoice.to.address}
        </p>

        <p class="text-sm text-white/60">
          {invoice.to.email}
        </p>
      </div>

      <div class="text-right">
        <p class="text-xs uppercase tracking-widest text-white/40 mb-2">
          Due Date
        </p>

        <p class="font-semibold">
          {invoice.dueDate}
        </p>

        <span
          class="inline-block mt-3 px-4 py-1 rounded-full text-xs font-bold uppercase"
          class:bg-emerald-500={invoice.status === 'paid'}
          class:bg-yellow-500={invoice.status === 'unpaid'}
          class:bg-red-500={invoice.status === 'overdue'}
          class:text-black={true}
        >
          {invoice.status}
        </span>
      </div>
    </div>

    <!-- ITEMS -->
    <div class="border-t border-white/10">
      <div class="grid grid-cols-12 py-4 text-xs uppercase tracking-wider text-white/40 border-b border-white/10">
        <div class="col-span-6">Description</div>
        <div class="col-span-2 text-center">Qty</div>
        <div class="col-span-4 text-right">Amount</div>
      </div>

      {#each invoice.items as item}
        <div class="grid grid-cols-12 py-5 border-b border-white/10">
          <div class="col-span-6 font-medium">
            {item.description}
          </div>

          <div class="col-span-2 text-center text-white/60">
            {item.qty}
          </div>

          <div class="col-span-4 text-right font-semibold">
            {invoice.currency} {(item.qty * item.price).toLocaleString('id-ID')}
          </div>
        </div>
      {/each}
    </div>

    <!-- TOTAL -->
    <div class="flex justify-end mt-8">
      <div class="w-72 space-y-3">
        <div class="flex justify-between text-sm text-white/50">
          <span>Subtotal</span>
          <span>
            {invoice.currency}
            {invoice.items
              .reduce((sum, item) => sum + item.qty * item.price, 0)
              .toLocaleString('id-ID')}
          </span>
        </div>

        <div class="flex justify-between text-sm text-white/50">
          <span>Tax</span>
          <span>{invoice.taxPercent}%</span>
        </div>

        <div class="flex justify-between text-xl font-black pt-4 border-t border-white/20">
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

    <!-- NOTES -->
    <div class="mt-14 pt-6 border-t border-white/10">
      <p class="text-xs uppercase tracking-widest text-white/40 mb-2">
        Notes
      </p>

      <p class="text-sm text-white/60">
        {invoice.notes}
      </p>
    </div>
  </div>
</div>