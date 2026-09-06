<script>
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/authStore.svelte.js';
  import AuthSidePanel from '$lib/components/AuthSidePanel.svelte';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let errorMsg = $state('');
  let loading = $state(false);

  async function handleRegister(e) {
    e.preventDefault();
    loading = true;
    errorMsg = '';

    try {
      await authStore.register(name, email, password);
      await authStore.logout(); // supaya tidak otomatis login, harus login manual dulu
      goto('/login?registered=1');
    } catch (err) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
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
        <a href="/login" class="pb-3 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
          Masuk
        </a>
        <span class="pb-3 text-sm font-semibold border-b-2" style="border-color:#8CFF3D; color:#111111">
          Daftar
        </span>
      </div>

      <h1 class="text-2xl font-bold text-slate-900">Buat akun baru!</h1>
      <p class="text-sm text-slate-500 mt-1 mb-6">Daftar sekarang untuk mulai membuat invoice profesional.</p>

      {#if errorMsg}
        <div class="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mb-4">
          {errorMsg}
        </div>
      {/if}

      <form onsubmit={handleRegister} class="space-y-4">

        <div>
          <label for="name" class="block text-xs font-medium text-slate-600 mb-1.5">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            bind:value={name}
            required
            placeholder="Nama Anda"
            class="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            style="--tw-ring-color:#8CFF3D"
          />
        </div>

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
          <label for="password" class="block text-xs font-medium text-slate-600 mb-1.5">Password (Min. 6 Karakter)</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            minlength="6"
            placeholder="Buat password"
            class="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            style="--tw-ring-color:#8CFF3D"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full flex items-center justify-center gap-2 text-black font-semibold py-3 rounded-full text-sm transition-opacity disabled:opacity-50"
          style="background:#8CFF3D"
        >
          {loading ? 'Memproses...' : 'Daftar →'}
        </button>
      </form>

      <p class="text-center text-xs text-slate-500 mt-6">
        Sudah punya akun?
        <a href="/login" class="font-semibold hover:underline text-slate-900">Masuk di sini</a>
      </p>

    </div>
  </div>

</main>