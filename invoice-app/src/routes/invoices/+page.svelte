<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Search } from "@lucide/svelte";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { invoiceStore } from "$lib/invoiceStore.svelte.js";
  import { sidebar } from "$lib/sidebarStore.svelte.js";

  import { notify } from "$lib/alerts.js";

  const PAGE_SIZE = 10;
  let invoices = $state([]);
  let loading = $state(true);
  let error = $state("");
  let search = $state("");
  let currentPage = $state(1);
  let sidebarOpen = $derived(sidebar.open);
  let filteredInvoices = $derived(invoices.filter((invoice) => [invoice.invoice_number, invoice.to_name, invoice.to_email, invoice.status].join(" ").toLowerCase().includes(search.toLowerCase())));
  let totalPages = $derived(Math.max(1, Math.ceil(filteredInvoices.length / PAGE_SIZE)));
  let paginatedInvoices = $derived(filteredInvoices.slice((Math.min(currentPage, totalPages) - 1) * PAGE_SIZE, Math.min(currentPage, totalPages) * PAGE_SIZE));

  onMount(async () => {
    try { invoices = await invoiceStore.getAll(); }
    catch (e) { error = e.message || "Gagal mengambil invoice."; }
    finally { loading = false; }
  });

  function editInvoice(id) { goto(`/editor?invoice=${id}`); }
  async function deleteInvoice(invoice) {
    const confirmed = await notify.confirm(
      "Hapus invoice?",
      `Invoice #${invoice.invoice_number || invoice.id} akan dihapus secara permanen.`,
      "Ya, hapus",
    );
    if (!confirmed) return;
    try {
      await invoiceStore.remove(invoice.id);
      invoices = invoices.filter((item) => item.id !== invoice.id);
      await notify.success("Invoice dihapus", "Data invoice berhasil dihapus.");
    } catch (err) {
      await notify.error("Gagal menghapus", err.message || "Terjadi kesalahan saat menghapus invoice.");
    }
  }
  function formatDate(value) { return value ? new Date(value).toLocaleDateString("id-ID") : "-"; }
  function updateSearch(value) { search = value; currentPage = 1; }
</script>

<div class="min-h-screen bg-gradient-to-b from-teal-50 via-white to-sky-50 dark:from-[#071817] dark:via-black dark:to-[#091225] text-slate-900 dark:text-white">
  <AppSidebar {sidebarOpen} onClose={() => sidebar.close()} />
  <main class="min-h-screen transition-all duration-300 {sidebarOpen ? 'lg:ml-64' : 'ml-0'}">
    <AppHeader title="Invoice Tersimpan" />
    <div class="pt-24 sm:pt-28 px-4 pb-8 max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div><h1 class="text-2xl font-bold">Invoice Tersimpan</h1><p class="text-sm opacity-60">Buka lagi, ubah penerima, lalu simpan.</p></div>
        <button type="button" onclick={() => goto('/editor')} class="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm" style="background:linear-gradient(135deg,#0f766e,#2563eb);">+ Invoice Baru</button>
      </div>
      <label class="relative block mb-4">
        <Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 opacity-60" aria-hidden="true" />
        <input value={search} oninput={(event) => updateSearch(event.currentTarget.value)} placeholder="Cari nomor invoice, penerima, email, atau status..." class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-full py-2 pl-11 pr-4 text-sm" />
      </label>
      {#if loading}<p class="opacity-60">Memuat invoice...</p>
      {:else if error}<p class="text-red-500">{error}</p>
      {:else if !invoices.length}<p class="opacity-60">Belum ada invoice tersimpan.</p>
      {:else if !filteredInvoices.length}<p class="opacity-60">Invoice tidak ditemukan.</p>
      {:else}
        <div class="grid gap-3">
          {#each paginatedInvoices as invoice (invoice.id)}
            <div class="rounded-xl border border-slate-200 dark:border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div><p class="font-semibold">{invoice.invoice_number || "Invoice"}</p><p class="text-sm opacity-60">{invoice.to_name || "Tanpa penerima"} · {formatDate(invoice.issue_date)}</p></div>
              <div class="flex gap-2 shrink-0">
                <button type="button" onclick={() => editInvoice(invoice.id)} class="rounded-lg border border-slate-300 dark:border-white/20 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10">Edit invoice</button>
                <button type="button" onclick={() => deleteInvoice(invoice)} class="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Hapus</button>
              </div>
            </div>
          {/each}
        </div>
        {#if totalPages > 1}
          <nav class="mt-5 flex items-center justify-between gap-3 text-sm" aria-label="Pagination invoice">
            <span class="opacity-60">{filteredInvoices.length} invoice · Halaman {Math.min(currentPage, totalPages)} dari {totalPages}</span>
            <div class="flex gap-2"><button type="button" onclick={() => (currentPage = Math.max(1, currentPage - 1))} disabled={currentPage <= 1} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Sebelumnya</button><button type="button" onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Berikutnya</button></div>
          </nav>
        {/if}
      {/if}
    </div>
  </main>
</div>
