<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import { scheduledEmailStore } from "$lib/scheduledEmailStore.svelte.js";
  import { theme } from "$lib/theme.svelte.js";

  const menuItems = [
    { label: "Buat Invoice", icon: "▣", href: "/editor" },
    { label: "Template", icon: "▤", href: "/templates" },
    { label: "Klien", icon: "♙", href: "/clients" },
    { label: "Produk", icon: "▱", href: "/products" },
    { label: "Jadwal Kirim", icon: "⏰", href: "/schedules" },
  ];

  let sidebarOpen = $state(false);

  let schedules = $state([]);
  let loading = $state(true);

  let reactivatingId = $state(null);
  let reactivateDate = $state("");

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
    if (!confirm("Batalkan jadwal ini? Jadwal tidak akan dikirim lagi.")) return;

    try {
      await scheduledEmailStore.cancel(id);
      await loadSchedules();
    } catch (error) {
      alert(error.message || "Gagal membatalkan jadwal.");
    }
  }

  function startReactivate(schedule) {
    reactivatingId = schedule.id;

    // Default: 5 menit dari sekarang
    const d = new Date(Date.now() + 5 * 60 * 1000);
    reactivateDate = d.toISOString().slice(0, 16);
  }

  async function confirmReactivate(id) {
    if (!reactivateDate) return;

    try {
      await scheduledEmailStore.reactivate(id, new Date(reactivateDate).toISOString());

      reactivatingId = null;

      await loadSchedules();
    } catch (error) {
      alert(error.message || "Gagal mengaktifkan ulang jadwal.");
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
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors"
>
  <AppSidebar
    {sidebarOpen}
    onClose={() => (sidebarOpen = false)}
    {menuItems}
    menuLabel="Menu"
  />

  <main
    class="min-h-screen transition-all duration-300 {sidebarOpen
      ? 'ml-64'
      : 'ml-0'}"
  >
    <!-- NAVBAR -->

    <nav
      class="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-black px-4 py-4 flex justify-between items-center"
    >
      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick={() => (sidebarOpen = !sidebarOpen)}
          aria-label="Toggle sidebar"
          class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="2" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="8" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="14" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>

        <a href="/" class="flex items-center gap-2 font-bold text-lg">
          <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
          InvoiceKita
        </a>
      </div>

      <div class="flex gap-4 items-center text-sm">
        <a href="/editor" class="opacity-70 hover:opacity-100 transition">
          Buat Invoice
        </a>

        <button
          onclick={() => theme.toggle()}
          class="text-lg"
          aria-label="Toggle dark mode"
        >
          {theme.dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>

    <!-- CONTENT -->

    <div class="py-8 px-4 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-2">Jadwal Kirim Otomatis</h1>

      <p class="text-center text-sm opacity-60 mb-6">
        Invoice yang dijadwalkan akan dikirim otomatis oleh server sesuai
        frekuensinya, sampai kamu batalkan.
      </p>

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
      {:else}
        <div class="space-y-3">
          {#each schedules as schedule (schedule.id)}
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
                      onclick={() => cancelSchedule(schedule.id)}
                      class="text-xs px-3 py-1.5 rounded-full border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Batalkan
                    </button>
                  {:else if schedule.status === "failed"}
                    <button
                      onclick={() => startReactivate(schedule)}
                      class="text-xs px-3 py-1.5 rounded-full border-2"
                      style="border-color:#8CFF3D; color:#8CFF3D;"
                    >
                      Aktifkan Lagi
                    </button>
                  {/if}
                </div>
              </div>

              <!-- FORM AKTIFKAN LAGI -->

              {#if reactivatingId === schedule.id}
                <div
                  class="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex gap-2 items-center"
                >
                  <input
                    type="datetime-local"
                    bind:value={reactivateDate}
                    class="flex-1 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-1.5 text-sm"
                  />

                  <button
                    onclick={() => confirmReactivate(schedule.id)}
                    class="text-xs px-3 py-1.5 font-semibold text-black rounded-full"
                    style="background:#8CFF3D"
                  >
                    Simpan
                  </button>

                  <button
                    onclick={() => (reactivatingId = null)}
                    class="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/20"
                  >
                    Batal
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>
</div>