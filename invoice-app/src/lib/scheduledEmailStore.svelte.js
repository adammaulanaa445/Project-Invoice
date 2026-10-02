// Semua request di sini pakai fetch() biasa, mengikuti pola invoiceStore.svelte.js

const API_BASE = 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

export const scheduledEmailStore = {
  // =========================
  // AMBIL SEMUA JADWAL
  // =========================

  async getAll() {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_BASE}/scheduled-emails`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) return [];

    return await res.json();
  },

  // =========================
  // BUAT JADWAL BARU
  // =========================

  async create(payload) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/scheduled-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal membuat jadwal.');
    }

    return data;
  },

  // =========================
  // BATALKAN JADWAL (status -> cancelled, data tetap ada)
  // =========================

  async cancel(id) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/scheduled-emails/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || 'Gagal membatalkan jadwal.');
    }

    return data;
  },

  // =========================
  // AKTIFKAN LAGI JADWAL YANG GAGAL (status 'failed')
  // =========================

  async reactivate(id, nextSendAt) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu.');

    const res = await fetch(`${API_BASE}/scheduled-emails/${id}/reactivate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ next_send_at: nextSendAt })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || 'Gagal mengaktifkan ulang jadwal.');
    }

    return data;
  }
};