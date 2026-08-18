<script>
  import { goto } from '$app/navigation';

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
      const res = await fetch('http://localhost:8800/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registrasi gagal');
      }

      // Simpan token otomatis setelah register
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      goto('/editor');
    } catch (err) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
  <div class="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
    <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-white">Daftar Akun InvoiceKita</h2>

    {#if errorMsg}
      <div class="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{errorMsg}</div>
    {/if}

    <form onsubmit={handleRegister} class="space-y-4">
      <div>
        <label class="block text-xs text-slate-500 mb-1">Nama Lengkap</label>
        <input type="text" bind:value={name} required class="w-full border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-xs text-slate-500 mb-1">Email</label>
        <input type="email" bind:value={email} required class="w-full border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-xs text-slate-500 mb-1">Password (Min. 6 Karakter)</label>
        <input type="password" bind:value={password} required class="w-full border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white" />
      </div>
      <button type="submit" disabled={loading} class="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Memproses...' : 'Daftar Sekarang'}
      </button>
    </form>
    
    <p class="text-center text-xs text-slate-500 mt-2">
      Sudah punya akun? <a href="/login" class="text-blue-600 hover:underline">Login di sini</a>
    </p>
  </div>
</div>