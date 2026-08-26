<script>
  let { component } = $props();

  const NATURAL_WIDTH = 820; // lebar asli semua desain invoice (max-w-[820px])

  let containerEl = $state();
  let innerEl = $state();
  let scale = $state(0.3);
  let boxHeight = $state(300);

  function measure() {
    if (!containerEl || !innerEl) return;
    const containerWidth = containerEl.clientWidth;
    const naturalHeight = innerEl.scrollHeight;
    if (!containerWidth || !naturalHeight) return;
    scale = containerWidth / NATURAL_WIDTH;
    boxHeight = naturalHeight * scale;
  }

  $effect(() => {
    // ukur setiap kali komponen dirender / ukuran berubah
    measure();
    const ro = new ResizeObserver(measure);
    if (containerEl) ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<div
  bind:this={containerEl}
  class="relative w-full overflow-hidden bg-white dark:bg-slate-950"
  style="height: {boxHeight}px;"
>
  <div
    bind:this={innerEl}
    class="absolute top-0 left-0 pointer-events-none origin-top-left"
    style="width: {NATURAL_WIDTH}px; transform: scale({scale});"
  >
    <svelte:component this={component} />
  </div>
</div>