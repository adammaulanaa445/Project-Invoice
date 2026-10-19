import Swal from 'sweetalert2';

const baseOptions = {
  buttonsStyling: false,
  confirmButtonText: 'Tutup',
  customClass: {
    popup: 'rounded-2xl',
    confirmButton:
      'rounded-full bg-lime-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2',
    cancelButton:
      'mr-2 rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
  },
};

function fire(icon, title, text) {
  return Swal.fire({ ...baseOptions, icon, title, text });
}

export const notify = {
  success(title, text = '') {
    return fire('success', title, text);
  },

  error(title, text = '') {
    return fire('error', title, text);
  },

  warning(title, text = '') {
    return fire('warning', title, text);
  },

  async confirm(title, text, confirmButtonText = 'Ya, lanjutkan') {
    const result = await Swal.fire({
      ...baseOptions,
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Batal',
      reverseButtons: true,
    });

    return result.isConfirmed;
  },
};
