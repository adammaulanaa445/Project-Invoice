<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { theme } from '$lib/theme.svelte.js';
  import { lang } from '$lib/lang.svelte.js';
  import { authStore } from '$lib/authStore.svelte.js';

  const API_BASE = 'http://localhost:8800/api';
  const STORAGE_BASE = 'http://localhost:8800/storage';

  let currentUser = $state(null);

  let profile = $state({
    company_name: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    npwp: '',
    logo_path: ''
  });

  let logoFile = $state(null);
  let logoPreview = $state('');
  let loading = $state(true);
  let saving = $state(false);
  let message = $state('');

  onMount(async () => {
    currentUser = authStore.getCurrentUser();

    const token = localStorage.getItem('auth_token');

    if (!token) {
      goto('/login');
      return;
    }

    await loadProfile();
  });

  async function loadProfile() {
    loading = true;

    try {
      const token = localStorage.getItem('auth_token');

      const response = await fetch(
        `${API_BASE}/company-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil profile.');
      }

      const data = await response.json();

      profile = {
        company_name: data.company_name ?? '',
        address: data.address ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        website: data.website ?? '',
        npwp: data.npwp ?? '',
        logo_path: data.logo_path ?? ''
      };

      if (data.logo_path) {
        logoPreview = `${STORAGE_BASE}/${data.logo_path}`;
      }

    } catch (error) {
      console.error(error);
      message = '❌ Gagal mengambil data profile.';
    } finally {
      loading = false;
    }
  }

  function handleLogoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message = '❌ File harus berupa gambar.';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      message = '❌ Ukuran logo maksimal 2MB.';
      return;
    }

    logoFile = file;

    logoPreview = URL.createObjectURL(file);

    message = '';
  }

  async function saveProfile() {
    saving = true;
    message = '';

    try {
      const token = localStorage.getItem('auth_token');

      const formData = new FormData();

      formData.append(
        'company_name',
        profile.company_name
      );

      formData.append(
        'address',
        profile.address
      );

      formData.append(
        'email',
        profile.email
      );

      formData.append(
        'phone',
        profile.phone
      );

      formData.append(
        'website',
        profile.website
      );

      formData.append(
        'npwp',
        profile.npwp
      );

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const response = await fetch(
        `${API_BASE}/company-profile`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan profile.'
        );
      }

      profile = {
        ...profile,
        ...data.profile
      };

      if (data.profile.logo_path) {
        logoPreview =
          `${STORAGE_BASE}/${data.profile.logo_path}`;
      }

      logoFile = null;

      message = '✅ Profile berhasil disimpan.';

    } catch (error) {
      console.error(error);

      message =
        '❌ ' +
        (error.message || 'Gagal menyimpan profile.');

    } finally {
      saving = false;
    }
  }

  function logout() {
    authStore.logout();
    goto('/login');
  }
</script>


<main
  class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors"
>

  <!-- NAVBAR -->
  <nav
    class="border-b border-slate-200 dark:border-white/10"
  >
    <div
      class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
    >

      <a
        href="/"
        class="flex items-center gap-2 font-bold text-lg"
      >
        <span
          class="w-3 h-3 rounded-full"
          style="background:#8CFF3D"
        ></span>

        InvoiceKita
      </a>

      <div class="flex items-center gap-4">

        <a
          href="/templates"
          class="text-sm opacity-70 hover:opacity-100"
        >
          {lang.t('nav_templates')}
        </a>

        <button
          onclick={() => theme.toggle()}
          class="text-lg"
        >
          {theme.dark ? '☀️' : '🌙'}
        </button>

        {#if currentUser}
          <div
            class="flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 px-3 py-1.5"
          >
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold"
              style="background:#8CFF3D"
            >
              {currentUser.name?.charAt(0).toUpperCase() ?? '?'}
            </span>

            <span class="text-sm font-medium">
              {currentUser.name}
            </span>
          </div>
        {/if}

      </div>

    </div>
  </nav>


  <!-- CONTENT -->
  <section class="max-w-4xl mx-auto px-6 py-10">

    <div class="mb-8">

      <button
        onclick={() => goto('/')}
        class="text-sm opacity-60 hover:opacity-100"
      >
        ← Kembali
      </button>

      <h1 class="text-3xl font-bold mt-5">
        Profile & Company Settings
      </h1>

      <p class="opacity-60 mt-2">
        Kelola informasi akun dan perusahaanmu.
      </p>

    </div>


    {#if loading}

      <div
        class="rounded-2xl border border-slate-200 dark:border-white/10 p-8 text-center"
      >
        Loading...
      </div>

    {:else}

      <!-- PROFILE -->
      <div
        class="rounded-2xl border border-slate-200 dark:border-white/10 p-6 mb-6"
      >

        <h2 class="text-xl font-bold mb-6">
          👤 Profile
        </h2>

        <div class="grid md:grid-cols-2 gap-5">

          <div>
            <label class="text-sm font-medium">
              Nama
            </label>

            <input
              value={currentUser?.name ?? ''}
              disabled
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 opacity-70"
            />
          </div>

          <div>
            <label class="text-sm font-medium">
              Email
            </label>

            <input
              value={currentUser?.email ?? ''}
              disabled
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 opacity-70"
            />
          </div>

        </div>

      </div>


      <!-- COMPANY -->
      <div
        class="rounded-2xl border border-slate-200 dark:border-white/10 p-6"
      >

        <h2 class="text-xl font-bold mb-6">
          🏢 Company Information
        </h2>


        <!-- LOGO -->
        <div class="mb-7">

          <label class="text-sm font-medium">
            Logo Perusahaan
          </label>

          <div class="flex items-center gap-5 mt-3">

            <div
              class="w-24 h-24 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-white/5"
            >

              {#if logoPreview}

                <img
                  src={logoPreview}
                  alt="Logo perusahaan"
                  class="w-full h-full object-contain"
                />

              {:else}

                <span class="text-3xl opacity-30">
                  🏢
                </span>

              {/if}

            </div>

            <div>

              <label
                class="inline-block cursor-pointer px-4 py-2 rounded-full font-semibold text-black"
                style="background:#8CFF3D"
              >
                Upload Logo

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onchange={handleLogoChange}
                  class="hidden"
                />
              </label>

              <p class="text-xs opacity-50 mt-2">
                PNG, JPG atau WEBP · Maks. 2MB
              </p>

            </div>

          </div>

        </div>


        <!-- COMPANY NAME -->
        <div class="mb-5">

          <label class="text-sm font-medium">
            Nama Perusahaan
          </label>

          <input
            bind:value={profile.company_name}
            placeholder="PT Contoh Indonesia"
            class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
          />

        </div>


        <!-- ADDRESS -->
        <div class="mb-5">

          <label class="text-sm font-medium">
            Alamat
          </label>

          <textarea
            bind:value={profile.address}
            rows="3"
            placeholder="Jl. Contoh No. 123, Surabaya"
            class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
          ></textarea>

        </div>


        <!-- EMAIL + PHONE -->
        <div class="grid md:grid-cols-2 gap-5 mb-5">

          <div>

            <label class="text-sm font-medium">
              Email Perusahaan
            </label>

            <input
              type="email"
              bind:value={profile.email}
              placeholder="admin@perusahaan.com"
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
            />

          </div>


          <div>

            <label class="text-sm font-medium">
              No. Telepon
            </label>

            <input
              bind:value={profile.phone}
              placeholder="08123456789"
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
            />

          </div>

        </div>


        <!-- WEBSITE + NPWP -->
        <div class="grid md:grid-cols-2 gap-5">

          <div>

            <label class="text-sm font-medium">
              Website
            </label>

            <input
              bind:value={profile.website}
              placeholder="https://perusahaan.com"
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
            />

          </div>


          <div>

            <label class="text-sm font-medium">
              NPWP
            </label>

            <input
              bind:value={profile.npwp}
              placeholder="00.000.000.0-000.000"
              class="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-[#8CFF3D]"
            />

          </div>

        </div>


        <!-- MESSAGE -->
        {#if message}

          <div
            class="mt-5 text-sm"
          >
            {message}
          </div>

        {/if}


        <!-- SAVE -->
        <div class="mt-7 flex justify-end">

          <button
            onclick={saveProfile}
            disabled={saving}
            class="px-6 py-3 rounded-full font-semibold text-black disabled:opacity-50"
            style="background:#8CFF3D"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
          </button>

        </div>

      </div>

    {/if}

  </section>

</main>