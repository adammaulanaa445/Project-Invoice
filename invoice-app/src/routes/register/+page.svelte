<script>
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/authStore.svelte.js';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let errorMsg = $state('');
  let loading = $state(false);

    function handleRegister(e) {
    e.preventDefault();
    loading = true;
    errorMsg = '';

    try {
      authStore.register(name, email, password);
      authStore.logout(); // jangan langsung login otomatis
      goto('/login?registered=1');
    } catch (err) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<main class="min-h-screen flex items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white px-4 transition-colors">
  <div class="max-w-md w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111] p-8 space-y-4">

    <div class="text-center">
      <a href="/" class="inline-flex items-center gap-2 font-bold text-lg mb-4">
        <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
        InvoiceKita
      </a>
      <h2 class="text-2xl font-bold">Daftar Akun InvoiceKita</h2>
    </div>

    {#if errorMsg}
      <div class="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm text-center">{errorMsg}</div>
    {/if}

    <form onsubmit={handleRegister} class="space-y-4">
      <div>
        <label class="block text-xs opacity-60 mb-1">Nama Lengkap</label>
        <input
          type="text"
          bind:value={name}
          required
          class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style="--tw-ring-color:#8CFF3D"
        />
      </div>
      <div>
        <label class="block text-xs opacity-60 mb-1">Email</label>
        <input
          type="email"
          bind:value={email}
          required
          class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style="--tw-ring-color:#8CFF3D"
        />
      </div>
      <div>
        <label class="block text-xs opacity-60 mb-1">Password (Min. 6 Karakter)</label>
        <input
          type="password"
          bind:value={password}
          required
          minlength="6"
          class="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#161616] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style="--tw-ring-color:#8CFF3D"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        class="w-full text-black py-2.5 rounded-full text-sm font-semibold disabled:opacity-50"
        style="background:#8CFF3D"
      >
        {loading ? 'Memproses...' : 'Daftar Sekarang'}
      </button>
    </form>

    <p class="text-center text-xs opacity-60 mt-2">
      Sudah punya akun? <a href="/login" class="font-medium hover:underline" style="color:#8CFF3D">Login di sini</a>
    </p>
  </div>
</main>