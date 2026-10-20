// =====================================================
// EMAIL PREVIEW EXPORTER — PART 1/2
// Mengubah preview invoice di editor menjadi HTML email yang
// aman & membawa DESAIN ASLI (bukan teks polos).
// outerHTML mentah cuma berisi class Tailwind yang TIDAK
// dimengerti Gmail/Outlook, plus warna oklch() yg tidak
// didukung email client. Solusi: salin COMPUTED STYLE
// (hasil render asli, sudah rgb/px) jadi inline style.
// =====================================================

const INLINE_PROPS = [
  'display', 'width', 'min-width', 'max-width',
  'height', 'min-height',
  'margin', 'margin-top', 'margin-right',
  'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right',
  'padding-bottom', 'padding-left',
  'color', 'background', 'background-color',
  'font', 'font-family', 'font-size',
  'font-weight', 'font-style', 'line-height',
  'letter-spacing', 'text-align', 'text-transform',
  'text-decoration', 'vertical-align', 'white-space',
  'border', 'border-top', 'border-right',
  'border-bottom', 'border-left', 'border-color',
  'border-width', 'border-style', 'border-radius',
  'border-collapse', 'box-shadow', 'opacity',
  'overflow', 'flex-direction', 'flex-wrap',
  'align-items', 'justify-content', 'gap',
  'flex', 'flex-grow', 'flex-shrink',
  'grid-template-columns',
];

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function sanitizeClone(root) {
  const elements = [root, ...root.querySelectorAll('*')];
  for (const el of elements) {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(attr.value)) {
        el.setAttribute(name, '#');
      }
    }
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') el.remove();
  }
  root.querySelectorAll('script,style,link').forEach((n) => n.remove());
}


// PART 2/2 — salin computed style + bungkus jadi dokumen email.
export function inlineComputedStyles(source, target) {
  const srcAll = [source, ...source.querySelectorAll('*')];
  const dstAll = [target, ...target.querySelectorAll('*')];
  const len = Math.min(srcAll.length, dstAll.length);
  for (let i = 0; i < len; i++) {
    const src = srcAll[i];
    const dst = dstAll[i];
    if (!(src instanceof Element) || !(dst instanceof Element)) continue;
    const computed = getComputedStyle(src);
    const parts = [];
    const existing = dst.getAttribute('style');
    if (existing) parts.push(existing.replace(/;\s*$/, ''));
    for (const prop of INLINE_PROPS) {
      const v = (computed.getPropertyValue(prop) || '').trim();
      if (!v || v === 'none' || v === 'normal' || v === 'auto') continue;
      if (v.startsWith('oklch') || v.startsWith('oklab')) continue;
      parts.push(prop + ':' + v);
    }
    if (parts.length) dst.setAttribute('style', parts.join(';'));
    dst.removeAttribute('class');
  }
}

export function buildEmailPreviewHtml(previewEl, meta) {
  meta = meta || {};
  if (!previewEl) throw new Error('Preview invoice tidak ditemukan.');
  previewEl.classList.add('pdf-export');
  void previewEl.offsetWidth;
  let html = '';
  try {
    const clone = previewEl.cloneNode(true);
    sanitizeClone(clone);
    inlineComputedStyles(previewEl, clone);
    clone.setAttribute(
      'style',
      'background:#ffffff;color:#0f172a;' + (clone.getAttribute('style') || ''),
    );
    const inner = clone.outerHTML;
    const invoiceNumber = escapeHtml(meta.invoiceNumber || '');
    const fromName = escapeHtml(meta.fromName || 'kami');
    const toName = escapeHtml(meta.toName || 'Bapak/Ibu');
    const title = invoiceNumber ? ' (#' + invoiceNumber + ')' : '';
    html = '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      + '<title>Invoice ' + invoiceNumber + '</title>'
      + '<style>img{max-width:100%!important;height:auto!important}'
      + 'table{border-collapse:collapse!important}</style></head>'
      + '<body style="margin:0;padding:24px 12px;background:#f4f6f8;'
      + 'font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.5;">'
      + '<div style="max-width:760px;margin:0 auto;">'
      + '<div style="background:#ffffff;border:1px solid #e5e7eb;'
      + 'border-radius:16px;padding:24px;margin-bottom:16px;'
      + 'font-size:14px;color:#334155;">'
      + '<p style="margin:0 0 8px;">Halo ' + toName + ',</p>'
      + '<p style="margin:0;">Berikut invoice dari <strong>' + fromName + '</strong>'
      + title + '. Tampilan di bawah ini sama persis dengan desain '
      + 'invoice yang dipilih. PDF resmi tetap terlampir.</p></div>'
      + '<div style="max-width:760px;margin:0 auto;background:#ffffff;">'
      + inner + '</div>'
      + '<p style="max-width:760px;margin:16px auto 0;font-size:12px;'
      + 'color:#64748b;">PDF invoice resmi terlampir.</p>'
      + '</div></body></html>';
  } finally {
    previewEl.classList.remove('pdf-export');
  }
  const clean = String(html).trim();
  if (clean.length < 100 || !/<(div|table|section|article)/i.test(clean)) {
    throw new Error('HTML preview invoice tidak valid.');
  }
  return clean;
}
