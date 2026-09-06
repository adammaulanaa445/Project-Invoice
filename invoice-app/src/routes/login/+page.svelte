<script>
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/authStore.svelte.js';
  import AuthSidePanel from '$lib/components/AuthSidePanel.svelte';

  let email = $state('');
  let password = $state('');
  let remember = $state(false);
  let errorMsg = $state('');
  let loading = $state(false);

  async function handleLogin(e) {
    e.preventDefault();
    loading = true;
    errorMsg = '';

    try {
      await authStore.login(email, password);
      goto('/');
    } catch (err) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
  }

  function loginWithGoogle() {
    authStore.loginWithGoogle();
  }
</script>

<main class="min-h-screen flex bg-white">

  <AuthSidePanel />

  <!-- RIGHT PANEL -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
    <div class="w-full max-w-sm">

      <!-- mobile-only logo -->
      <a href="/" class="lg:hidden flex items-center gap-2 font-bold text-lg mb-8 text-slate-900">
        <span class="w-3 h-3 rounded-full" style="background:#8CFF3D"></span>
        InvoiceKita
      </a>

      <!-- TABS -->
      <div class="flex gap-6 border-b border-slate-200 mb-8">
        <span class="pb-3 text-sm font-semibold border-b-2" style="border-color:#8CFF3D; color:#111111">
          Masuk
        </span>
        <a href="/register" class="pb-3 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
          Daftar
        </a>
      </div>

      <h1 class="text-2xl font-bold text-slate-900">Selamat datang kembali!</h1>
      <p class="text-sm text-slate-500 mt-1 mb-6">Masuk ke akun Anda untuk melanjutkan.</p>

      {#if errorMsg}
        <div class="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mb-4">
          {errorMsg}
        </div>
      {/if}

      <form onsubmit={handleLogin} class="space-y-4">

        <div>
          <label for="email" class="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="contoh@email.com"
            class="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            style="--tw-ring-color:#8CFF3D"
          />
        </div>

        <div>
          <label for="password" class="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            placeholder="Masukkan password"
            class="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            style="--tw-ring-color:#8CFF3D"
          />
        </div>

        <div class="flex items-center justify-between text-xs">
          <label class="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              bind:checked={remember}
              class="rounded border-slate-300"
              style="accent-color:#8CFF3D"
            />
            Ingat saya
          </label>
          <a href="/forgot-password" class="font-medium hover:underline text-slate-900">
            Lupa password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full flex items-center justify-center gap-2 text-black font-semibold py-3 rounded-full text-sm transition-opacity disabled:opacity-50"
          style="background:#8CFF3D"
        >
          {loading ? 'Memproses...' : 'Masuk →'}
        </button>
      </form>

      <div class="relative flex py-6 items-center">
        <div class="flex-grow border-t border-slate-200"></div>
        <span class="flex-shrink mx-4 text-xs text-slate-400">atau lanjut dengan</span>
        <div class="flex-grow border-t border-slate-200"></div>
      </div>

      <button
        onclick={loginWithGoogle}
        type="button"
        class="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-full transition-colors text-sm"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        Lanjut dengan Google
      </button>

      <p class="text-center text-xs text-slate-500 mt-6">
        Belum punya akun?
        <a href="/register" class="font-semibold hover:underline text-slate-900">Daftar sekarang</a>
      </p>

    </div>
  </div>

</main>