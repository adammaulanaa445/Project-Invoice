<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { invoiceStore } from "$lib/invoiceStore.svelte.js";
  import { sidebar } from "$lib/sidebarStore.svelte.js";

  let invoices = $state([]);
  let loading = $state(true);
  let error = $state("");
  let sidebarOpen = $derived(sidebar.open);

  onMount(async () => {
    try { invoices = await invoiceStore.getAll(); }
    catch (e) { error = e.message || "Gagal mengambil invoice."; }
    finally { loading = false; }
  });

  function editInvoice(id) { goto(`/editor?invoice=${id}`); }
  function formatDate(value) {
    return value ? new Date(value).toLocaleDateString("id-ID") : "-";
  }
</script>

<div class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
  <AppSidebar {sidebarOpen} onClose={() => sidebar.close()} />
  <main class="min-h-screen transition-all duration-300 {sidebarOpen ? 'lg:ml-64' : 'ml-0'}">
    <AppHeader title="Invoice Tersimpan" />
    <div class="pt-24 sm:pt-28 px-4 pb-8 max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div><h1 class="text-2xl font-bold">Invoice Tersimpan</h1><p class="text-sm opacity-60">Buka lagi, ubah penerima, lalu simpan.</p></div>
        <button type="button" onclick={() => goto('/editor')} class="rounded-lg px-4 py-2 text-sm font-semibold text-black" style="background:#8CFF3D">+ Invoice Baru</button>
      </div>
      {#if loading}<p class="opacity-60">Memuat invoice...</p>
      {:else if error}<p class="text-red-500">{error}</p>
      {:else if !invoices.length}<p class="opacity-60">Belum ada invoice tersimpan.</p>
      {:else}
        <div class="grid gap-3">
          {#each invoices as invoice}
            <div class="rounded-xl border border-slate-200 dark:border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div><p class="font-semibold">{invoice.invoice_number || "Invoice"}</p><p class="text-sm opacity-60">{invoice.to_name || "Tanpa penerima"} · {formatDate(invoice.issue_date)}</p></div>
              <button type="button" onclick={() => editInvoice(invoice.id)} class="rounded-lg border border-slate-300 dark:border-white/20 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10">Edit invoice</button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>
</div>
