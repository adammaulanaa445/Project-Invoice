const API_BASE = 'http://localhost:8000/api';


function getToken() {
  return localStorage.getItem('auth_token');
}


export const invoiceStore = {

  // =====================================================
  // SIMPAN INVOICE
  // =====================================================

  async save(templateId, invoiceData) {

    const token = getToken();

    if (!token) {
      throw new Error(
        'Kamu harus login dulu untuk menyimpan invoice.'
      );
    }


    // Pastikan ada item
    if (
      !invoiceData.items ||
      invoiceData.items.length === 0
    ) {
      throw new Error(
        'Invoice harus memiliki minimal 1 item.'
      );
    }


    const payload = {

      template_id: templateId,

      issue_date:
        invoiceData.issueDate,

      due_date:
        invoiceData.dueDate,

      currency:
        invoiceData.currency,

      from_name:
        invoiceData.from.name,

      from_address:
        invoiceData.from.address,

      from_email:
        invoiceData.from.email,

      from_phone:
        invoiceData.from.phone,

      logo_url:
        invoiceData.logoUrl || null,

      to_name:
        invoiceData.to.name,

      to_address:
        invoiceData.to.address,

      to_email:
        invoiceData.to.email,

      tax_percent:
        Number(invoiceData.taxPercent) || 0,

      // Database discount tetap dipertahankan.
      // Fitur discount di UI sudah dihapus.
      discount_percent:
        Number(invoiceData.discountPercent) || 0,

      notes:
        invoiceData.notes,

      status:
        invoiceData.status,

      items:
        invoiceData.items.map((item) => ({
          description:
            item.description,

          qty:
            Number(item.qty) || 1,

          price:
            Number(item.price) || 0
        }))

    };


    const res = await fetch(
      `${API_BASE}/invoices`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          'Accept':
            'application/json',

          'Authorization':
            `Bearer ${token}`
        },

        body:
          JSON.stringify(payload)
      }
    );


    const data =
      await res.json().catch(() => ({}));


    // TOKEN EXPIRED
    if (res.status === 401) {

      localStorage.removeItem(
        'auth_token'
      );

      localStorage.removeItem(
        'user'
      );

      throw new Error(
        'UNAUTHORIZED'
      );
    }


    // ERROR VALIDASI
    if (!res.ok) {

      if (data.errors) {

        const firstError =
          Object.values(data.errors)
            .flat()[0];

        throw new Error(
          firstError ||
          data.message ||
          'Gagal menyimpan invoice.'
        );
      }


      throw new Error(
        data.message ||
        'Gagal menyimpan invoice.'
      );
    }


    return {
      id:
        data.id,

      invoiceNumber:
        data.invoice_number,

      raw:
        data
    };
  },


  // =====================================================
  // AMBIL SEMUA INVOICE
  // =====================================================

  async getAll() {

    const token = getToken();

    if (!token) {
      return [];
    }


    const res = await fetch(
      `${API_BASE}/invoices`,
      {
        headers: {
          'Authorization':
            `Bearer ${token}`,

          'Accept':
            'application/json'
        }
      }
    );


    if (res.status === 401) {

      localStorage.removeItem(
        'auth_token'
      );

      localStorage.removeItem(
        'user'
      );

      return [];
    }


    if (!res.ok) {
      return [];
    }


    const json =
      await res.json();


    return json.data ?? json;
  },


  // =====================================================
  // KIRIM EMAIL SEKARANG
  // =====================================================

  async sendEmail(
    invoiceId,
    recipientEmail,
    pdfBlob
  ) {

    const token = getToken();

    if (!token) {
      throw new Error(
        'Kamu harus login terlebih dahulu.'
      );
    }


    const formData =
      new FormData();


    formData.append(
      'email',
      recipientEmail.trim()
    );


    formData.append(
      'pdf',
      pdfBlob,
      `Invoice-${invoiceId}.pdf`
    );


    const res = await fetch(
      `${API_BASE}/invoices/${invoiceId}/send-email`,
      {
        method: 'POST',

        headers: {
          'Authorization':
            `Bearer ${token}`,

          'Accept':
            'application/json'
        },

        body:
          formData
      }
    );


    const data =
      await res.json().catch(() => ({}));


    if (res.status === 401) {

      localStorage.removeItem(
        'auth_token'
      );

      localStorage.removeItem(
        'user'
      );

      throw new Error(
        'UNAUTHORIZED'
      );
    }


    if (!res.ok) {

      throw new Error(
        data.message ||
        'Gagal mengirim email.'
      );
    }


    return data;
  },


  // =====================================================
  // JADWALKAN EMAIL
  // =====================================================

  async scheduleEmail(
    invoiceId,
    recipientEmail,
    scheduledAt,
    pdfBlob
  ) {

    const token = getToken();

    if (!token) {
      throw new Error(
        'Kamu harus login terlebih dahulu.'
      );
    }


    const formData =
      new FormData();


    formData.append(
      'email',
      recipientEmail.trim()
    );


    formData.append(
      'scheduled_at',
      scheduledAt
    );


    formData.append(
      'pdf',
      pdfBlob,
      `Invoice-${invoiceId}.pdf`
    );


    const res = await fetch(
      `${API_BASE}/invoices/${invoiceId}/schedule-email`,
      {
        method: 'POST',

        headers: {
          'Authorization':
            `Bearer ${token}`,

          'Accept':
            'application/json'
        },

        body:
          formData
      }
    );


    const data =
      await res.json().catch(() => ({}));


    if (res.status === 401) {

      localStorage.removeItem(
        'auth_token'
      );

      localStorage.removeItem(
        'user'
      );

      throw new Error(
        'UNAUTHORIZED'
      );
    }


    if (!res.ok) {

      throw new Error(
        data.message ||
        'Gagal menjadwalkan email.'
      );
    }


    return data;
  }

};