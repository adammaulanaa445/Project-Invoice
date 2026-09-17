// Semua request di sini pakai fetch() biasa, mengikuti pola invoiceStore.svelte.js

const API_BASE = 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

export const clientStore = {
  // =========================
  // AMBIL SEMUA KLIEN
  // =========================

  async getAll() {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_BASE}/clients`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) return [];

    return await res.json();
  },

  // =========================
  // TAMBAH KLIEN BARU
  // =========================

  async create(clientData) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal menyimpan klien.');
    }

    return data;
  },

  // =========================
  // UPDATE KLIEN
  // =========================

  async update(id, clientData) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal memperbarui klien.');
    }

    return data;
  },

  // =========================
  // HAPUS KLIEN
  // =========================

  async remove(id) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Gagal menghapus klien.');
    }
  }
};
