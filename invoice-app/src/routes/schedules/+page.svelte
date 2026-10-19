<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { scheduledEmailStore } from "$lib/scheduledEmailStore.svelte.js";
  import { sidebar } from "$lib/sidebarStore.svelte.js";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { notify } from "$lib/alerts.js";
  import { Ban, Check, Clock3, Pencil, RotateCcw, Search } from "@lucide/svelte";

  function showFailure(error, fallback) {
    return notify.error("Proses gagal", error?.message || fallback);
  }

  function validateDate(value, message) {
    if (value) return true;
    notify.warning("Waktu belum dipilih", message);
    return false;
  }

  const menuItems = [
    { label: "Buat Invoice", icon: "▣", href: "/editor" },
    { label: "Template", icon: "▤", href: "/templates" },
    { label: "Klien", icon: "♙", href: "/clients" },
    { label: "Produk", icon: "▱", href: "/products" },
    { label: "Jadwal Kirim", icon: "⏰", href: "/schedules" },
  ];

  let sidebarOpen = $derived(sidebar.open);

  const PAGE_SIZE = 10;
  let schedules = $state([]);
  let loading = $state(true);
  let search = $state("");
  let currentPage = $state(1);
  let filteredSchedules = $derived(
    schedules.filter((schedule) =>
      [schedule.invoice?.invoice_number, schedule.recipient_email, schedule.frequency, schedule.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );
  let totalPages = $derived(Math.max(1, Math.ceil(filteredSchedules.length / PAGE_SIZE)));
  let paginatedSchedules = $derived(filteredSchedules.slice((Math.min(currentPage, totalPages) - 1) * PAGE_SIZE, Math.min(currentPage, totalPages) * PAGE_SIZE));

  let editingId = $state(null);
  let editDate = $state("");
  let editFrequency = $state("daily");

  function toLocalInput(value) {
    if (!value) return "";
    const d = new Date(value);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function startEdit(schedule) {
    editingId = schedule.id;
    editDate = toLocalInput(schedule.next_send_at);
    editFrequency = schedule.frequency ?? "daily";
  }

  async function saveEdit(id) {
    if (!validateDate(editDate, "Pilih waktu kirim baru sebelum menyimpan.")) return;

    try {
      await scheduledEmailStore.update(id, new Date(editDate).toISOString(), editFrequency);
      editingId = null;
      await loadSchedules();
      await notify.success("Jadwal diperbarui", "Waktu pengiriman sudah disimpan.");
    } catch (error) {
      await showFailure(error, "Gagal mengubah jadwal.");
    }
  }

  const frequencyLabel = {
    once: "Sekali",
    hourly: "Setiap jam",
    daily: "Setiap hari",
    weekly: "Setiap minggu",
    monthly: "Setiap bulan",
  };

  const statusLabel = {
    active: "Aktif",
    completed: "Selesai",
    cancelled: "Dibatalkan",
    failed: "Gagal",
  };

  const statusColor = {
    active: "text-emerald-500",
    completed: "opacity-60",
    cancelled: "text-red-500",
    failed: "text-orange-500",
  };

  async function loadSchedules() {
    loading = true;

    try {
      schedules = await scheduledEmailStore.getAll();
    } catch (error) {
      console.error("Load schedules error:", error);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      goto("/login");
      return;
    }

    await loadSchedules();
  });

  async function cancelSchedule(id) {
    const confirmed = await notify.confirm(
      "Batalkan jadwal?",
      "Invoice tidak akan dikirim lagi dari jadwal ini.",
      "Ya, batalkan",
    );
    if (!confirmed) return;

    try {
      await scheduledEmailStore.cancel(id);
      await loadSchedules();
      await notify.success("Jadwal dibatalkan", "Pengiriman otomatis sudah dihentikan.");
    } catch (error) {
      await showFailure(error, "Gagal membatalkan jadwal.");
    }
  }

  async function deleteSchedule(schedule) {
    const confirmed = await notify.confirm(
      "Hapus jadwal?",
      `Jadwal ke ${schedule.recipient_email} akan dihapus permanen.`,
      "Ya, hapus",
    );
    if (!confirmed) return;

    try {
      await scheduledEmailStore.remove(schedule.id);
      await loadSchedules();
      await notify.success("Jadwal dihapus", "Jadwal kirim sudah dihapus permanen.");
    } catch (error) {
      await showFailure(error, "Gagal menghapus jadwal.");
    }
  }

  function formatDate(value) {
    if (!value) return "-";

    return new Date(value).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
</script>

<div
  class="min-h-screen bg-gradient-to-b from-teal-50 via-white to-sky-50 dark:from-[#071817] dark:via-black dark:to-[#091225] text-slate-900 dark:text-white transition-colors"
>
  <AppSidebar
    {sidebarOpen}
    onClose={() => sidebar.close()}
    {menuItems}
    menuLabel="Menu"
  />

  <main
    class="min-h-screen transition-all duration-300 {sidebarOpen
      ? 'ml-64'
      : 'ml-0'}"
  >
    <AppHeader title="Jadwal Kirim" />

    <!-- CONTENT -->

    <div class="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-2">Jadwal Kirim Otomatis</h1>

      <p class="text-center text-sm opacity-60 mb-6">
        Invoice yang dijadwalkan akan dikirim otomatis oleh server sesuai
        frekuensinya, sampai kamu batalkan.
      </p>

      <label class="relative block mb-4">
        <Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 opacity-60" aria-hidden="true" />
        <input value={search} oninput={(event) => { search = event.currentTarget.value; currentPage = 1; }} placeholder="Cari invoice, email, frekuensi, atau status..." class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-full py-2 pl-11 pr-4 text-sm" />
      </label>

      {#if loading}
        <p class="text-center opacity-60">Memuat jadwal...</p>
      {:else if schedules.length === 0}
        <p class="text-center opacity-60">
          Belum ada jadwal kirim. Buat lewat halaman
          <a href="/editor" class="underline" style="color:#8CFF3D">
            Buat Invoice
          </a>
          → tombol "Kirim Email" → centang "Kirim otomatis berulang".
        </p>
      {:else if !filteredSchedules.length}
        <p class="text-center opacity-60">Jadwal tidak ditemukan.</p>
      {:else}
        <div class="space-y-3">
          {#each paginatedSchedules as schedule (schedule.id)}
            <div
              class="bg-slate-50 dark:bg-[#111] rounded-xl border border-slate-200 dark:border-white/10 p-4"
            >
              <div class="flex justify-between items-start gap-4">
                <div class="min-w-0">
                  <p class="font-semibold truncate">
                    {schedule.invoice?.invoice_number ?? `Invoice #${schedule.invoice_id}`}
                    <span class="opacity-50 font-normal">
                      → {schedule.recipient_email}
                    </span>
                  </p>

                  <p class="text-sm opacity-60 mt-1">
                    {frequencyLabel[schedule.frequency] ?? schedule.frequency} ·
                    <span class={statusColor[schedule.status] ?? ""}>
                      {statusLabel[schedule.status] ?? schedule.status}
                    </span>
                  </p>

                  <p class="text-xs opacity-50 mt-1">
                    Kirim berikutnya: {formatDate(schedule.next_send_at)}
                  </p>

                  {#if schedule.last_sent_at}
                    <p class="text-xs opacity-50">
                      Terakhir terkirim: {formatDate(schedule.last_sent_at)}
                      ({schedule.send_count}x)
                    </p>
                  {/if}

                  {#if schedule.status === "failed" && schedule.last_error}
                    <p class="text-xs text-orange-500 mt-1">
                      Error: {schedule.last_error}
                    </p>
                  {/if}
                </div>

                <div class="flex gap-2 shrink-0">
                  {#if schedule.status === "active"}
                    <button
                      onclick={() => startEdit(schedule)}
                      class="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                      Edit Waktu
                    </button>
                    <button
                      onclick={() => cancelSchedule(schedule.id)}
                      class="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Batalkan
                    </button>
                  {:else if schedule.status === "cancelled" || schedule.status === "failed"}
                    <button
                      onclick={() => startEdit(schedule)}
                      class="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-800 font-medium text-white hover:bg-slate-700 dark:border-white/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      Aktifkan Lagi
                    </button>
                    <button
                      onclick={() => deleteSchedule(schedule)}
                      class="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Hapus
                    </button>
                  {/if}
                </div>
              </div>

              {#if editingId === schedule.id}
                <div class="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                  <input type="datetime-local" bind:value={editDate} class="border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm" />
                  <select bind:value={editFrequency} class="border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm">
                    <option value="once">Sekali</option>
                    <option value="hourly">Setiap jam</option>
                    <option value="daily">Setiap hari</option>
                    <option value="weekly">Setiap minggu</option>
                    <option value="monthly">Setiap bulan</option>
                  </select>
                  <button onclick={() => saveEdit(schedule.id)} class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 font-medium text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">{schedule.status === "active" ? "Simpan" : "Simpan & Aktifkan"}</button>
                  <button onclick={() => (editingId = null)} class="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10">Batal</button>
                </div>
              {/if}
            </div>
          {/each}
        </div>
        {#if totalPages > 1}
          <nav class="mt-5 flex items-center justify-between gap-3 text-sm" aria-label="Pagination jadwal">
            <span class="opacity-60">{filteredSchedules.length} jadwal · Halaman {Math.min(currentPage, totalPages)} dari {totalPages}</span>
            <div class="flex gap-2"><button type="button" onclick={() => (currentPage = Math.max(1, currentPage - 1))} disabled={currentPage <= 1} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Sebelumnya</button><button type="button" onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} class="rounded-lg border border-slate-300 dark:border-white/20 px-3 py-1.5 disabled:opacity-40">Berikutnya</button></div>
          </nav>
        {/if}
      {/if}
    </div>
  </main>
</div>
