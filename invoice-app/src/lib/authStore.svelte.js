// Dipakai untuk semua fetch() biasa (login, register, logout, dll)
// Request lewat proxy SvelteKit ini supaya tidak kena masalah CORS di InfinityFree
const API_BASE = '/api/proxy';

// Dipakai KHUSUS untuk redirect halaman penuh (window.location.href),
// seperti login Google. Ini BUKAN fetch(), jadi CORS browser tidak berlaku
// di sini — jadi tetap arahkan langsung ke domain backend asli.
const API_BASE_DIRECT = 'https://app-inv.xo.je/api';



function saveSession(user, token) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
}


export const authStore = {

  // =========================
  // REGISTER 
  // =========================

  async register(name, email, password) {

    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({
        name,
        email,
        password
      })
    });


    const data = await res.json();


    if (!res.ok) {

      const msg =
        data.message ||
        data.errors?.email?.[0] ||
        'Registrasi gagal';

      throw new Error(msg);
    }


    saveSession(
      data.user,
      data.access_token
    );


    return data.user;
  },


  // =========================
  // LOGIN
  // =========================

  async login(email, password) {

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({
        email,
        password
      })
    });


    const data = await res.json();


    if (!res.ok) {

      const msg =
        data.message ||
        data.errors?.email?.[0] ||
        'Login gagal';

      throw new Error(msg);
    }


    saveSession(
      data.user,
      data.access_token
    );


    return data.user;
  },


  // =========================
  // GOOGLE LOGIN
  // =========================
  // Catatan: ini sengaja tetap pakai API_BASE_DIRECT (bukan proxy),
  // karena ini redirect halaman penuh, bukan fetch(). CORS tidak
  // relevan di sini, jadi biarkan browser langsung menuju InfinityFree.

  loginWithGoogle() {

    window.location.href =
      `${API_BASE_DIRECT}/auth/google`;
  },


  // =========================
  // SIMPAN SESSION GOOGLE
  // =========================

  setSession(user, token) {

    saveSession(
      user,
      token
    );
  },


  // =========================
  // LOGOUT
  // =========================

  async logout() {

    const token =
      localStorage.getItem('auth_token');


    if (token) {

      try {

        await fetch(`${API_BASE}/logout`, {
          method: 'POST',

          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

      } catch {

        // Tetap hapus session lokal
      }
    }


    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },


  // =========================
  // GET CURRENT USER
  // =========================

  getCurrentUser() {

    try {

      const raw =
        localStorage.getItem('user');

      return raw
        ? JSON.parse(raw)
        : null;

    } catch {

      return null;
    }
  },


  // =========================
  // GET TOKEN
  // =========================

  getToken() {

    return localStorage.getItem(
      'auth_token'
    );
  }

};