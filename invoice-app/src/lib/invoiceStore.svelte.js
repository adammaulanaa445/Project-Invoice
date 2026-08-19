const STORAGE_KEY = 'invoicekita_invoices';

function loadAll() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateId() {
  return 'inv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function generateInvoiceNumber() {
  return 'INV-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const invoiceStore = {
  // Simpan invoice baru, kembalikan invoice_number yang dibuat
  save(templateId, invoiceData) {
    const list = loadAll();
    const record = {
      id: generateId(),
      templateId,
      invoiceNumber: invoiceData.invoiceNumber || generateInvoiceNumber(),
      data: invoiceData,
      createdAt: new Date().toISOString(),
    };
    list.unshift(record); // yang terbaru di paling atas
    persist(list);
    return record;
  },

  // Ambil semua invoice tersimpan
  getAll() {
    return loadAll();
  },

  // Ambil 1 invoice by id
  getById(id) {
    return loadAll().find((r) => r.id === id) || null;
  },

  // Hapus 1 invoice
  remove(id) {
    const list = loadAll().filter((r) => r.id !== id);
    persist(list);
  },
};