<script>
  const features = [
    { icon: '📄', text: '42+ Template Gratis' },
    { icon: '📧', text: 'Kirim via Email' },
    { icon: '☁️', text: 'Simpan di Cloud' },
    { icon: '⚡', text: 'Akses Kapan Saja' }
  ];
</script>

<div class="hidden lg:flex flex-col justify-between w-1/2 bg-[#0d0d0d] text-white p-12 relative overflow-hidden">

  <!-- decorative glow -->
  <div
    class="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
    style="background:#8CFF3D"
  ></div>

  <!-- LOGO -->
  <a href="/" class="flex items-center gap-2 font-bold text-lg relative z-10">
    <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
    InvoiceKita
  </a>

  <!-- HEADLINE + FEATURES -->
  <div class="relative z-10 max-w-md">
    <h1 class="text-4xl font-bold leading-tight mb-4">
      Buat invoice<br />
      <span style="color:#8CFF3D">lebih mudah,</span><br />
      <span style="color:#8CFF3D">lebih cepat.</span>
    </h1>

    <p class="opacity-60 text-sm mb-8">
      Kelola invoice bisnis Anda dengan praktis dan profesional.
    </p>

    <ul class="space-y-4">
      {#each features as f}
        <li class="flex items-center gap-3 text-sm">
          <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0">
            {f.icon}
          </span>
          <span class="opacity-80">{f.text}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- DECORATIVE INVOICE CARD -->
  <div class="relative z-10 hidden md:block">
    <div class="w-48 rounded-xl p-4 shadow-2xl" style="background:#8CFF3D">
      <p class="text-black font-bold text-xs mb-3 tracking-wide">INVOICE</p>
      <div class="space-y-1.5">
        <div class="h-1.5 bg-black/20 rounded w-full"></div>
        <div class="h-1.5 bg-black/20 rounded w-3/4"></div>
        <div class="h-1.5 bg-black/20 rounded w-5/6"></div>
        <div class="h-1.5 bg-black/20 rounded w-2/3"></div>
      </div>
    </div>
  </div>

</div>