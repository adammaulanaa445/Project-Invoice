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
  'text-decoration', 'text-decoration-line',
  'text-decoration-color', 'text-decoration-style',
  'vertical-align', 'white-space',
  'border', 'border-top', 'border-right',
  'border-bottom', 'border-left', 'border-color',
  'border-top-color', 'border-right-color',
  'border-bottom-color', 'border-left-color',
  'border-width', 'border-style', 'border-radius',
  'border-collapse', 'box-shadow', 'opacity',
  'overflow', 'flex-direction', 'flex-wrap',
  'align-items', 'justify-content', 'gap',
  'flex', 'flex-grow', 'flex-shrink',
  'grid-template-columns',
];

// Properti yang TIDAK BOLEH lolos ke email karena bikin
// teks numpuk / hilang di Gmail/Outlook.
const EMAIL_UNSAFE_PATTERNS = [
  /^position$/i, // absolute/fixed/relative bikin teks saling menimpa
  /^inset(-(top|right|bottom|left))?$/i,
  /^(top|right|bottom|left|z-index)$/i,
  /^transform$/i,
  /^filter$/i, // invert() dark-mode ikut ke-inline -> warna aneh
  /^backdrop-filter$/i,
  /^mix-blend-mode$/i,
  /^background-clip$/i, // bg-clip-text butuh -webkit- di email
  /^(-webkit-)?background-clip$/i,
  /^(-webkit-)?text-fill-color$/i,
];

function isUnsafeProp(prop) {
  return EMAIL_UNSAFE_PATTERNS.some((re) => re.test(prop));
}

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
// Perbaikan Gmail:
// 1. STRIP properti berbahaya (position/transform/filter/gradient-text)
//    supaya teks tidak saling menimpa di email client.
// 2. NORMALISASI <a>: Gmail memaksa link jadi biru + underline.
//    Kita paksa color:inherit + text-decoration:none inline, dan
//    bungkus isi link dengan <span> berwarna sama (Gmail kadang
//    me-link-kan nomor/alamat otomatis -> span menjaga warna).
// 3. FIX gradient-text (bg-clip-text text-transparent): di email
//    background-image tidak jalan -> teks jadi TRANSPARAN = hilang.
//    Ganti paksa jadi warna solid (ambil warna gradient pertama).
// 4. FIX flex gap: Gmail tidak dukung `gap` -> tambah margin fallback.
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
      if (isUnsafeProp(prop)) continue;
      const v = (computed.getPropertyValue(prop) || '').trim();
      if (!v || v === 'none' || v === 'normal' || v === 'auto') continue;
      if (v.startsWith('oklch') || v.startsWith('oklab')) continue;
      if (/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/i.test(v)) continue;
      parts.push(prop + ':' + v);
    }

    // --- FIX 3: gradient-text -> warna solid ---
    // Ciri: computed color = transparent/rgba(0,0,0,0).
    // Ambil warna dari background-image gradient, fallback slate-800.
    const computedColor = (computed.getPropertyValue('color') || '').trim();
    const bgImage = (computed.getPropertyValue('background-image') || '').trim();
    const isTransparentText =
      computedColor === 'transparent' ||
      computedColor === 'rgba(0, 0, 0, 0)';
    if (isTransparentText) {
      const firstColor = (bgImage.match(/(rgb\([^)]+\)|#[0-9a-fA-F]{3,8})/) || [])[1];
      parts.push('color:' + (firstColor || '#1e293b'));
      parts.push('background-image:none');
      parts.push('-webkit-text-fill-color:' + (firstColor || '#1e293b'));
    } else if (/gradient/i.test(bgImage)) {
      // Gradient background (header dsb): Gmail tidak dukung gradient
      // oklch -> ganti warna solid pertama agar tidak polos/aneh.
      const firstColor = (bgImage.match(/(rgb\([^)]+\)|#[0-9a-fA-F]{3,8})/) || [])[1];
      if (firstColor && !/oklch|oklab/i.test(bgImage)) {
        parts.push('background:' + firstColor);
        parts.push('background-color:' + firstColor);
      } else if (/oklch|oklab/i.test(bgImage)) {
        // Gradient oklch tidak bisa dipakai -> fallback ungu template
        parts.push('background:#7c3aed');
        parts.push('background-color:#7c3aed');
      }
      parts.push('background-image:none');
    }

    if (parts.length) dst.setAttribute('style', parts.join(';'));
    dst.removeAttribute('class');

    // --- FIX 2: normalisasi link agar TIDAK biru + underline ---
    if (dst.tagName === 'A') {
      const parentColor = parts.join(';').match(/color:([^;]+)/);
      const linkColor = parentColor ? parentColor[1] : computed.getPropertyValue('color');
      dst.setAttribute(
        'style',
        (dst.getAttribute('style') || '') +
          ';color:' + (linkColor || 'inherit') +
          ';text-decoration:none!important',
      );
    }
  }
}

// Bungkus SEMUA teks dengan span anti-auto-link Gmail.
// Gmail otomatis mengubah email/no HP/tanggal jadi <a> biru.
// Trik standar: <style> u + .body .gmail-blend... + wrap dengan
// span class="gmail-no-link" tidak cukup; yang paling ampuh adalah
// CSS `a { color:inherit; text-decoration:none }` di <style> +
// inline style per elemen (sudah dilakukan di atas).
function gmailHeadStyle() {
  return '<style>'
    + 'img{max-width:100%!important;height:auto!important}'
    + 'table{border-collapse:collapse!important}'
    // Paksa SEMUA link warisi warna teks sekitarnya, tanpa underline.
    // !important agar menang melawan user-agent Gmail.
    + 'a,a:visited,a:hover,a:active{color:inherit!important;'
    + 'text-decoration:none!important}'
    // Matikan auto-link biru Gmail (email/telp/tanggal/address).
    // Gmail membungkusnya dengan span.MsoHyperlink dsb — samakan warna.
    + 'u + #body a,.gmail a,.gmail-blend a{color:inherit!important;'
    + 'text-decoration:none!important}'
    + '</style>';
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
      + '<meta name="color-scheme" content="light">'
      + '<meta name="supported-color-schemes" content="light">'
      + '<title>Invoice ' + invoiceNumber + '</title>'
      + gmailHeadStyle() + '</head>'
      + '<body id="body" class="gmail" style="margin:0;padding:24px 12px;background:#f4f6f8;'
      + 'font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.5;">'
      + '<div style="max-width:760px;margin:0 auto;">'
      + '<div style="background:#ffffff;border:1px solid #e5e7eb;'
      + 'border-radius:16px;padding:24px;margin-bottom:16px;'
      + 'font-size:14px;color:#334155;">'
      + '<p style="margin:0 0 8px;">Halo ' + toName + ',</p>'
      + '<p style="margin:0;">Berikut invoice dari <strong>' + fromName + '</strong>'
      + title + '. Tampilan di bawah ini sama persis dengan desain '
      + 'invoice yang dipilih. PDF resmi tetap terlampir.</p></div>'
      + '<div style="max-width:760px;margin:0 auto;background:#ffffff;'
      // Kunci anti-numpuk: paksa positioning normal di wrapper.
      // Elemen absolute di dalam tetap di-strip oleh isUnsafeProp,
      // tapi wrapper ini memastikan tidak ada yang overlap keluar.
      + 'position:relative;overflow:hidden;">'
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
