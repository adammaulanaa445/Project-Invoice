// =====================================================
// EMAIL PREVIEW EXPORTER
// Mengubah preview invoice di editor menjadi HTML email yang
// aman & membawa DESAIN ASLI (bukan teks polos).
// Kompatibel: Gmail, Outlook, Apple Mail, Yahoo Mail.
// =====================================================

// Properti yang AMAN di-inline ke email.
const INLINE_PROPS = [
  'display',
  'width', 'min-width', 'max-width',
  'height', 'min-height',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'color', 'background', 'background-color',
  'font', 'font-family', 'font-size', 'font-weight', 'font-style',
  'line-height', 'letter-spacing',
  'text-align', 'text-transform', 'text-decoration',
  'text-decoration-line', 'text-decoration-color', 'text-decoration-style',
  'vertical-align', 'white-space',
  'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-color', 'border-top-color', 'border-right-color',
  'border-bottom-color', 'border-left-color',
  'border-width', 'border-style', 'border-radius',
  'border-collapse', 'border-spacing',
  'box-shadow', 'opacity',
  'overflow',
  'flex-direction', 'flex-wrap', 'align-items', 'justify-content',
  'gap', 'flex', 'flex-grow', 'flex-shrink',
  'grid-template-columns',
  'table-layout',
];

// Properti TIDAK BOLEH lolos ke email karena bikin teks numpuk / hilang.
const EMAIL_UNSAFE_PATTERNS = [
  /^position$/i,
  /^inset(-(top|right|bottom|left))?$/i,
  /^(top|right|bottom|left|z-index)$/i,
  /^transform(-(origin|style))?$/i,
  /^filter$/i,
  /^backdrop-filter$/i,
  /^mix-blend-mode$/i,
  /^background-clip$/i,
  /^(-webkit-)?background-clip$/i,
  /^(-webkit-)?text-fill-color$/i,
  /^will-change$/i,
  /^animation.*$/i,
  /^transition.*$/i,
  /^cursor$/i,
  /^user-select$/i,
  /^pointer-events$/i,
  /^resize$/i,
  /^outline$/i,
  /^list-style.*$/i,
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

// =====================================================
// SANITIZE CLONE — buang elemen berbahaya dari clone DOM
// =====================================================
export function sanitizeClone(root) {
  // Hapus script, style, link
  root.querySelectorAll('script,style,link').forEach((n) => n.remove());

  // Hapus event handler
  const elements = [root, ...root.querySelectorAll('*')];
  for (const el of elements) {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(attr.value)) {
        el.setAttribute(name, '#');
      }
    }
  }

  // Hapus elemen DEKORATIF yang positionnya absolute/fixed
  // (lingkaran blur, watermark, stempel rotate, ornamen SVG).
  // PENTING: cek dulu computed style untuk position,
  // tidak hanya class-nya saja.
  const decorativeSelectors = [
    '[class*="absolute"]',
    '[class*="fixed"]',
    '[style*="position:absolute"]',
    '[style*="position: absolute"]',
    '[style*="position:fixed"]',
    '[style*="position: fixed"]',
    '[style*="rotate"]',
  ];
  const decorative = root.querySelectorAll(decorativeSelectors.join(','));
  for (const el of decorative) {
    if (!el.isConnected) continue;
    const text = (el.textContent || '').trim();
    const cls = (el.getAttribute('class') || '') + ' ' + (el.getAttribute('style') || '');

    // SVG dekoratif → hapus
    if (el.tagName === 'SVG' || el.tagName === 'svg') {
      el.remove();
      continue;
    }

    // Watermark angka raksasa (font sangat besar, sedikit karakter)
    const isWatermark = /110px|90px|80px|9rem|10rem|12rem/.test(cls)
      || (text.length <= 6 && /text-\[|font-thin|font-extralight/.test(cls));
    if (isWatermark) {
      el.remove();
      continue;
    }

    // Badge status absolute yang PENTING (Paid/Lunas/Overdue) → jadikan static
    if (/^(paid|unpaid|overdue|lunas|invoice)$/i.test(text)) {
      el.removeAttribute('class');
      el.setAttribute(
        'style',
        'display:inline-block;padding:4px 12px;margin:8px 0;'
          + 'border:2px solid #111111;border-radius:8px;'
          + 'font-size:12px;font-weight:700;color:#111111;background:#ffffff;',
      );
      continue;
    }

    // Elemen dekoratif murni (teks kosong, 1 kata pendek, rotasi/absolut)
    const looksDecorative =
      text.length === 0 ||
      (text.length <= 20 && /absolute|rotate|fixed/i.test(cls));
    if (looksDecorative) {
      el.remove();
    }
  }
}

// =====================================================
// INLINE COMPUTED STYLES
// Salin computed style browser ke inline style tiap elemen
// agar warna/font/spacing tetap di email client.
// =====================================================
export function inlineComputedStyles(source, target) {
  const srcAll = [source, ...source.querySelectorAll('*')];
  const dstAll = [target, ...target.querySelectorAll('*')];
  const len = Math.min(srcAll.length, dstAll.length);

  for (let i = 0; i < len; i++) {
    const src = srcAll[i];
    const dst = dstAll[i];
    if (!(src instanceof Element) || !(dst instanceof Element)) continue;

    const computed = getComputedStyle(src);

    // Skip elemen yang tersembunyi di browser (display:none)
    // agar tidak muncul di email.
    if (computed.getPropertyValue('display') === 'none') {
      dst.setAttribute('style', 'display:none;');
      dst.removeAttribute('class');
      continue;
    }

    const parts = [];
    // Pertahankan inline style eksisting yang sudah ada
    const existing = dst.getAttribute('style');
    if (existing) parts.push(existing.replace(/;\s*$/, ''));

    for (const prop of INLINE_PROPS) {
      if (isUnsafeProp(prop)) continue;
      const v = (computed.getPropertyValue(prop) || '').trim();
      if (!v) continue;
      // Skip nilai default yang tidak berguna
      if (prop === 'display' && v === 'block') {
        // Tetap tulis display:block agar jelas
      } else if (v === 'none' && prop !== 'display') continue;
      if (v === 'normal' || v === 'auto') continue;
      // Skip warna oklch/oklab (tidak didukung email client)
      if (v.startsWith('oklch') || v.startsWith('oklab')) continue;
      // Skip transparent rgba(0,0,0,0) — akan ditangani FIX gradient-text
      if (/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/i.test(v)) continue;
      parts.push(prop + ':' + v);
    }

    // --- FIX: gradient-text → warna solid ---
    // Ciri: computed color = transparent. Teks jadi INVISIBLE di email
    // karena background-image gradient tidak jalan.
    const computedColor = (computed.getPropertyValue('color') || '').trim();
    const bgImage = (computed.getPropertyValue('background-image') || '').trim();
    const isTransparentText =
      computedColor === 'transparent' ||
      computedColor === 'rgba(0, 0, 0, 0)';

    if (isTransparentText) {
      // Ambil warna pertama dari gradient, fallback slate-800
      const firstColor = (bgImage.match(/(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{3,8})/) || [])[1];
      parts.push('color:' + (firstColor || '#1e293b'));
      parts.push('background-image:none');
      parts.push('-webkit-background-clip:initial');
    } else if (/gradient/i.test(bgImage)) {
      // Gradient background (header, dll): Gmail tidak dukung oklch gradient
      // → ganti warna solid pertama.
      const firstColor = (bgImage.match(/(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{3,8})/) || [])[1];
      if (firstColor && !/oklch|oklab/i.test(bgImage)) {
        parts.push('background:' + firstColor);
        parts.push('background-color:' + firstColor);
      } else if (/oklch|oklab/i.test(bgImage)) {
        parts.push('background:#7c3aed');
        parts.push('background-color:#7c3aed');
      }
      parts.push('background-image:none');
    }

    if (parts.length) dst.setAttribute('style', parts.join(';'));
    dst.removeAttribute('class');

    // --- FIX link: paksa warna inherit agar tidak biru di Gmail ---
    if (dst.tagName === 'A') {
      // Ambil warna dari computed style elemen ini
      const linkColorRaw = (computed.getPropertyValue('color') || '').trim();
      // Hindari transparent/oklch
      const safeColor = (
        linkColorRaw &&
        !linkColorRaw.startsWith('oklch') &&
        !linkColorRaw.startsWith('oklab') &&
        !/rgba\(0,0,0,0\)/.test(linkColorRaw.replace(/\s/g, ''))
      ) ? linkColorRaw : '#0f172a';

      const existStyle = dst.getAttribute('style') || '';
      // Hapus color yang sudah ada lalu tulis ulang
      const withoutColor = existStyle.replace(/\bcolor\s*:[^;]+;?/gi, '');
      dst.setAttribute(
        'style',
        withoutColor.replace(/;$/, '') +
          ';color:' + safeColor +
          '!important;text-decoration:none!important;',
      );
    }
  }
}

// =====================================================
// KONVERTER LAYOUT: flex/grid → table
// Gmail TIDAK mendukung display:flex, display:grid, gap.
// Konversi ke <table><tr><td> agar kolom tidak menimpa.
// =====================================================

function styleOf(el) {
  return (el.getAttribute('style') || '').toLowerCase();
}

function isFlexRow(el) {
  const s = styleOf(el);
  if (!/display\s*:\s*flex/.test(s)) return false;
  if (/flex-direction\s*:\s*column/.test(s)) return false;
  return true;
}

function isGrid(el) {
  return /display\s*:\s*(grid|inline-grid)/.test(styleOf(el));
}

// Hitung jumlah kolom dari grid-template-columns
function gridColumnCount(el) {
  const m = (el.getAttribute('style') || '').match(
    /grid-template-columns\s*:\s*([^;]+)/i,
  );
  if (!m) return el.children.length || 1;
  const def = m[1].trim();
  const repeat = def.match(/repeat\(\s*(\d+)/i);
  if (repeat) return parseInt(repeat[1], 10);
  return Math.max(1, def.split(/\s+/).filter(Boolean).length);
}

// Hitung lebar td proporsional dari style anak
function childWidths(container, count) {
  const kids = [...container.children].filter(
    (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
  );
  const widths = kids.map((kid) => {
    const s = (kid.getAttribute('style') || '').toLowerCase();
    const w = s.match(/(?:^|;)\s*width\s*:\s*([^;]+)/);
    if (w) return w[1].trim();
    return '*';
  });
  while (widths.length < count) widths.push('*');
  const auto = (100 / count).toFixed(2) + '%';
  return widths.map((w) => (w === '*' ? auto : w));
}

// Ubah container flex/grid menjadi <table>
function flexGridToTable(container, colCount) {
  const doc = container.ownerDocument;
  const kids = [...container.children].filter(
    (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
  );
  if (!kids.length) return;

  const widths = childWidths(container, colCount || kids.length);

  const table = doc.createElement('table');
  table.setAttribute('width', '100%');
  table.setAttribute('cellpadding', '0');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border', '0');
  table.setAttribute('role', 'presentation');
  table.setAttribute('style', 'width:100%;border-collapse:collapse;border-spacing:0;table-layout:fixed;');

  const tr = doc.createElement('tr');
  const cs = styleOf(container);
  const isCenter = /align-items\s*:\s*center/.test(cs);
  const isEnd = /justify-(content\s*:\s*)?(space-between|between|end|flex-end)/.test(cs);

  kids.forEach((kid, i) => {
    const td = doc.createElement('td');
    td.setAttribute('valign', isCenter ? 'middle' : 'top');

    const w = widths[i] || widths[widths.length - 1];
    if (w && !w.includes('*')) {
      td.setAttribute('width', w);
      td.setAttribute('style', 'vertical-align:' + (isCenter ? 'middle' : 'top') + ';padding:0;width:' + w + ';');
    } else {
      td.setAttribute('style', 'vertical-align:' + (isCenter ? 'middle' : 'top') + ';padding:0;');
    }

    // Rata kanan untuk kolom terakhir jika justify-between
    if (isEnd && i === kids.length - 1) {
      const ts = td.getAttribute('style') || '';
      td.setAttribute('style', ts + 'text-align:right;');
    }

    // Pindahkan isi anak ke dalam wrapper div di dalam td
    const wrapper = doc.createElement('div');
    const kidStyle = kid.getAttribute('style');
    if (kidStyle) wrapper.setAttribute('style', kidStyle);
    while (kid.firstChild) wrapper.appendChild(kid.firstChild);
    td.appendChild(wrapper);
    tr.appendChild(td);
  });

  table.appendChild(tr);
  container.replaceWith(table);
}

// Konversi semua flex/grid (deepest-first) ke table
export function convertToEmailSafeLayout(root) {
  const all = [root, ...root.querySelectorAll('*')].reverse();
  for (const el of all) {
    if (!(el instanceof Element)) continue;
    if (!el.isConnected) continue;
    const tag = el.tagName;
    // Jangan ubah table asli
    if (['TABLE', 'TR', 'TD', 'TH', 'THEAD', 'TBODY', 'TFOOT'].includes(tag)) continue;
    if (['SCRIPT', 'STYLE', 'LINK'].includes(tag)) continue;

    const elementKids = [...el.children].filter(
      (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
    );
    if (elementKids.length < 1) continue;

    if (isGrid(el)) {
      const cols = gridColumnCount(el);
      if (cols <= 1 && elementKids.length <= 1) continue;
      flexGridToTable(el, cols);
    } else if (isFlexRow(el) && elementKids.length >= 2) {
      flexGridToTable(el, elementKids.length);
    }
  }
}

// =====================================================
// ANTI-AUTO-LINK: Gmail otomatis membungkus email/telp/tanggal
// jadi <a> biru. Strategi: CSS global di <style> + sisipkan
// zero-width non-joiner (​) di tengah pola umum.
// =====================================================

function gmailHeadStyle() {
  return '<style>'
    + 'body,div,p,td,th,span{color:inherit!important}'
    + 'img{max-width:100%!important;height:auto!important;display:block;}'
    + 'table{border-collapse:collapse!important}'
    // Paksa SEMUA link warisi warna teks sekitarnya, tanpa underline.
    + 'a,a:visited,a:hover,a:active{'
    + 'color:inherit!important;text-decoration:none!important}'
    // Matikan auto-link biru Gmail (email/telp/tanggal/address).
    + 'u + #body a,'
    + '.gmail a,'
    + 'span.MsoHyperlink,'
    + 'span[style*="color:windowtext"]{'
    + 'color:inherit!important;text-decoration:none!important}'
    + '</style>';
}

// =====================================================
// FUNGSI UTAMA: buildEmailPreviewHtml
// =====================================================
export function buildEmailPreviewHtml(previewEl, meta) {
  meta = meta || {};
  if (!previewEl) throw new Error('Preview invoice tidak ditemukan.');

  previewEl.classList.add('pdf-export');
  void previewEl.offsetWidth; // paksa reflow

  let html = '';
  try {
    // 1. Clone DOM
    const clone = previewEl.cloneNode(true);

    // 2. Sanitasi — hapus dekorasi absolute, script, event handler
    sanitizeClone(clone);

    // 3. Salin computed styles ke inline style
    inlineComputedStyles(previewEl, clone);

    // 4. Konversi flex/grid → table (deepest first)
    convertToEmailSafeLayout(clone);

    // 5. Paksa wrapper berwarna putih & posisi statis
    clone.setAttribute(
      'style',
      'display:block;background:#ffffff;color:#0f172a;position:static;'
        + (clone.getAttribute('style') || '').replace(/position\s*:[^;]+;?/gi, ''),
    );
    clone.removeAttribute('class');

    const inner = clone.outerHTML;
    const invoiceNumber = escapeHtml(meta.invoiceNumber || '');
    const fromName = escapeHtml(meta.fromName || 'kami');
    const toName = escapeHtml(meta.toName || 'Bapak/Ibu');
    const title = invoiceNumber ? ' #' + invoiceNumber : '';

    html = '<!DOCTYPE html><html lang="id">'
      + '<head>'
      + '<meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      + '<meta name="color-scheme" content="light">'
      + '<meta name="supported-color-schemes" content="light">'
      + '<title>Invoice' + title + '</title>'
      + gmailHeadStyle()
      + '</head>'
      + '<body id="body" class="gmail" style="margin:0;padding:24px 12px;'
      + 'background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;'
      + 'color:#172033;line-height:1.5;">'

      // --- Blok sapaan ---
      + '<div style="max-width:760px;margin:0 auto;">'
      + '<div style="background:#ffffff;border:1px solid #e5e7eb;'
      + 'border-radius:16px;padding:20px 24px;margin-bottom:16px;">'
      + '<p style="margin:0 0 8px;font-size:14px;color:#334155;">Halo <strong>' + toName + '</strong>,</p>'
      + '<p style="margin:0;font-size:14px;color:#334155;">'
      + 'Berikut invoice dari <strong>' + fromName + '</strong>' + title + '.'
      + ' Tampilan di bawah persis dengan desain yang dipilih.'
      + ' PDF resmi terlampir.</p>'
      + '</div>'

      // --- Wrapper invoice preview ---
      + '<div style="max-width:760px;margin:0 auto;">'
      + inner
      + '</div>'

      // --- Footer ---
      + '<p style="max-width:760px;margin:16px auto 0;font-size:12px;'
      + 'color:#64748b;">PDF invoice resmi terlampir untuk disimpan atau dicetak.</p>'
      + '</div>'
      + '</body></html>';

  } finally {
    previewEl.classList.remove('pdf-export');
  }

  const clean = String(html).trim();
  if (clean.length < 100 || !/<(div|table|section|article)/i.test(clean)) {
    throw new Error('HTML preview invoice tidak valid.');
  }
  return clean;
}
