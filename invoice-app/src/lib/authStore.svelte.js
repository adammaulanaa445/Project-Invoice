const API_BASE =import.meta.env.VITE_API_URL ||'http://localhost:8800/api'|| 'http://localhost:8000/api';


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

  loginWithGoogle() {

    window.location.href =
      `${API_BASE}/auth/google`;
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