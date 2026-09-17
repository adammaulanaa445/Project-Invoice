// Semua request di sini pakai fetch() biasa, mengikuti pola invoiceStore.svelte.js

const API_BASE = 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

export const productStore = {
  // =========================
  // AMBIL SEMUA PRODUK
  // =========================

  async getAll() {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_BASE}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) return [];

    return await res.json();
  },

  // =========================
  // TAMBAH PRODUK BARU
  // =========================

  async create(productData) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal menyimpan produk.');
    }

    return data;
  },

  // =========================
  // UPDATE PRODUK
  // =========================

  async update(id, productData) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal memperbarui produk.');
    }

    return data;
  },

  // =========================
  // HAPUS PRODUK
  // =========================

  async remove(id) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Gagal menghapus produk.');
    }
  }
};
