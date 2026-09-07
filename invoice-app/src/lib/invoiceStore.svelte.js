const API_BASE = 'https://project-invoice-production-6b1f.up.railway.app/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

export const invoiceStore = {
  async save(templateId, invoiceData) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login dulu untuk menyimpan invoice.');

    const payload = {
      template_id: templateId,
      issue_date: invoiceData.issueDate,
      due_date: invoiceData.dueDate,
      currency: invoiceData.currency,
      from_name: invoiceData.from.name,
      from_address: invoiceData.from.address,
      from_email: invoiceData.from.email,
      from_phone: invoiceData.from.phone,
      logo_url: invoiceData.logoUrl || null,
      to_name: invoiceData.to.name,
      to_address: invoiceData.to.address,
      to_email: invoiceData.to.email,
      tax_percent: invoiceData.taxPercent,
      discount_percent: invoiceData.discountPercent,
      notes: invoiceData.notes,
      status: invoiceData.status,
      items: invoiceData.items.map((i) => ({
        description: i.description,
        qty: i.qty,
        price: i.price
      }))
    };

    const res = await fetch(`${API_BASE}/invoices`, {
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
      throw new Error(data.message || 'Gagal menyimpan invoice');
    }
    return { id: data.id, invoiceNumber: data.invoice_number, raw: data };
  },

  async getAll() {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_BASE}/invoices`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? json; // Laravel paginate() bungkus hasil dalam field "data"
  },

  async sendEmail(invoiceId, recipientEmail, pdfBlob) {
    const token = getToken();
    if (!token) throw new Error('Kamu harus login terlebih dahulu.');

    const formData = new FormData();
    formData.append('email', recipientEmail.trim());
    formData.append('pdf', pdfBlob, `Invoice-${invoiceId}.pdf`);

    const res = await fetch(`${API_BASE}/invoices/${invoiceId}/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: formData
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      throw new Error('UNAUTHORIZED');
    }

    if (!res.ok) {
      throw new Error(data.message || 'Gagal mengirim email.');
    }

    return data;
  }
};