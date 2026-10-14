<script>
  import { onMount } from "svelte";
  import { Check, ChevronDown, Search, X } from "@lucide/svelte";

  let {
    options = [],
    value = $bindable(""),
    onselect = () => {},
    placeholder = "Pilih...",
    searchPlaceholder = "Cari...",
    emptyText = "Tidak ditemukan",
  } = $props();

  let open = $state(false);
  let query = $state("");
  let highlighted = $state(0);
  let root;

  let filtered = $derived(
    options.filter((option) =>
      `${option.label || ""} ${option.sublabel || ""}`.toLowerCase().includes(query.toLowerCase()),
    ),
  );
  let selected = $derived(options.find((option) => String(option.value) === String(value)));

  function choose(option) {
    value = String(option.value);
    onselect(value);
    open = false;
    query = "";
  }

  function clear(event) {
    event.stopPropagation();
    value = "";
    onselect("");
    query = "";
  }

  function handleKeydown(event) {
    if (!open && ["ArrowDown", "Enter"].includes(event.key)) {
      event.preventDefault();
      open = true;
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlighted = Math.min(highlighted + 1, Math.max(filtered.length - 1, 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      highlighted = Math.max(highlighted - 1, 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[highlighted]) choose(filtered[highlighted]);
    } else if (event.key === "Escape") {
      open = false;
    }
  }

  $effect(() => {
    query;
    highlighted = 0;
  });

  onMount(() => {
    const closeOutside = (event) => {
      if (root && !root.contains(event.target)) open = false;
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  });
</script>

<div class="relative" bind:this={root} onkeydown={handleKeydown}>
  <button type="button" class="w-full flex items-center gap-2 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-lg px-3 py-2 text-sm text-left" onclick={() => (open = !open)}>
    {#if selected}
      <span class="flex-1 min-w-0"><span class="block truncate">{selected.label}</span><span class="block text-xs opacity-60 truncate">{selected.sublabel}</span></span>
      <button type="button" aria-label="Hapus pilihan" class="opacity-60 hover:opacity-100" onclick={clear}><X size={15} /></button>
    {:else}
      <span class="flex-1 opacity-60">{placeholder}</span>
    {/if}
    <ChevronDown size={16} class="opacity-60" />
  </button>

  {#if open}
    <div class="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161616] shadow-xl p-1">
      <div class="flex items-center gap-2 px-2 border-b border-slate-200 dark:border-white/10">
        <Search size={15} class="opacity-50" />
        <input autofocus bind:value={query} placeholder={searchPlaceholder} class="w-full bg-transparent py-2 text-sm outline-none" onkeydown={handleKeydown} />
      </div>
      <div class="max-h-52 overflow-y-auto py-1">
        {#if filtered.length}
          {#each filtered as option, index}
            <button type="button" class="w-full flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-[#8CFF3D]/15 {index === highlighted ? 'bg-[#8CFF3D]/15' : ''}" onclick={() => choose(option)} onmouseenter={() => (highlighted = index)}>
              <span class="flex-1 min-w-0"><span class="block truncate">{option.label}</span><span class="block text-xs opacity-60 truncate">{option.sublabel}</span></span>
              {#if String(option.value) === String(value)}<Check size={16} style="color:#8CFF3D" />{/if}
            </button>
          {/each}
        {:else}
          <p class="px-2 py-3 text-sm opacity-60">{emptyText}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
