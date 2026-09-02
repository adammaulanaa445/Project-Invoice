const API_BASE = 'http://localhost:8800/api';

function saveSession(user, token) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export const authStore = {
  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || data.errors?.email?.[0] || 'Registrasi gagal';
      throw new Error(msg);
    }
    saveSession(data.user, data.access_token);
    return data.user;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || data.errors?.email?.[0] || 'Login gagal';
      throw new Error(msg);
    }
    saveSession(data.user, data.access_token);
    return data.user;
  },

  async logout() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        await fetch(`${API_BASE}/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
      } catch {
        // abaikan kalau gagal, tetap hapus sesi lokal
      }
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },
};