<script>
  import { Menu, Moon, Sun } from '@lucide/svelte';
  import { sidebar } from '$lib/sidebarStore.svelte.js';
  import { theme } from '$lib/theme.svelte.js';
  let { title = 'InvoiceKita' } = $props();
  let sidebarOpen = $derived(sidebar.open);
</script>

<header
  class="fixed top-0 left-0 {sidebarOpen
    ? 'lg:left-64'
    : 'lg:left-0'} right-0 z-40 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur px-4 sm:px-8 py-4 flex justify-between items-center gap-3"
>
  <div class="flex items-center gap-3 min-w-0">
    <button
      type="button"
      onclick={() => sidebar.toggle()}
      aria-label="Toggle sidebar"
      class="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition"
    >
      <Menu size={18} />
    </button>
    <div class="min-w-0">
      <p class="text-xs opacity-50">InvoiceKita</p>
      <h1 class="text-lg font-bold truncate">{title}</h1>
    </div>
  </div>

  <div class="flex items-center gap-2 shrink-0">
    <button
      type="button"
      onclick={() => theme.toggle()}
      aria-label="Toggle dark mode"
      class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition"
    >
      {#if theme.dark}
        <Sun size={18} />
      {:else}
        <Moon size={18} />
      {/if}
    </button>
  </div>
</header>
