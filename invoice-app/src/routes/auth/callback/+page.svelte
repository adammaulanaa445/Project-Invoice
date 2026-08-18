<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Ambil token dan data user dari query URL
    const token = page.url.searchParams.get('token');
    const userStr = page.url.searchParams.get('user');

    if (token) {
      // Simpan ke localStorage
      localStorage.setItem('auth_token', token);
      if (userStr) {
        localStorage.setItem('user', userStr);
      }
      // Pindahkan user ke halaman editor
      goto('/editor');
    } else {
      // Jika tidak ada token, kembalikan ke login
      goto('/login');
    }
  });
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200">
  <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
  <p class="text-sm font-medium">Memproses login Google...</p>
</div>  