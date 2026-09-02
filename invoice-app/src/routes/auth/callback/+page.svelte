<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/authStore.svelte.js';

  let errorMsg = $state('');
  let loading = $state(true);


  onMount(() => {

    try {

      const params =
        new URLSearchParams(
          window.location.search
        );


      const token =
        params.get('token');

      const userRaw =
        params.get('user');


      if (!token || !userRaw) {

        throw new Error(
          'Data login Google tidak lengkap.'
        );
      }


      const user =
        JSON.parse(userRaw);


      // Simpan session
      authStore.setSession(
        user,
        token
      );


      // Masuk ke editor
      goto('/editor');

    } catch (error) {

      console.error(
        'Google Login Error:',
        error
      );

      errorMsg =
        error.message ||
        'Login Google gagal.';

      loading = false;

    }

  });
</script>


<main
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white flex items-center justify-center p-4"
>

  <div
    class="w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111] p-8 text-center"
  >

    {#if loading}

      <div class="space-y-4">

        <div
          class="mx-auto w-10 h-10 border-4 border-slate-200 border-t-[#8CFF3D] rounded-full animate-spin"
        ></div>

        <h1 class="text-xl font-bold">
          Memproses Login...
        </h1>

        <p class="text-sm opacity-60">
          Tunggu sebentar, kamu sedang diarahkan.
        </p>

      </div>

    {:else}

      <div class="space-y-4">

        <div class="text-red-500 text-4xl">
          !
        </div>

        <h1 class="text-xl font-bold">
          Login Google Gagal
        </h1>

        <p class="text-sm opacity-60">
          {errorMsg}
        </p>

        <button
          onclick={() => goto('/login')}
          class="rounded-full px-6 py-2.5 font-semibold text-black"
          style="background:#8CFF3D"
        >
          Kembali ke Login
        </button>

      </div>

    {/if}

  </div>

</main>