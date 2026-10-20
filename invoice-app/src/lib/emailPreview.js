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

  // Hapus DEKORASI ABSOLUTE yang menimpa di Gmail:
  // lingkaran blur, watermark angka raksasa, stempel rotate,
  // badge absolute, ornamen svg absolute. Ini murni hiasan —
  // tanpa mereka isi invoice tetap lengkap & rapi.
  // (Daftar pola dari audit 42 template.)
  const decorative = root.querySelectorAll([
    '[class*="absolute"]',
    '[class*="fixed"]',
    '[style*="position:absolute"]',
    '[style*="position: absolute"]',
    '[style*="position:fixed"]',
    '[style*="rotate"]',
    'svg[class*="absolute"]',
  ].join(','));
  for (const el of decorative) {
    const text = (el.textContent || '').trim();
    const cls = (el.getAttribute('class') || '') + ' ' + (el.getAttribute('style') || '');
    // Jangan hapus kalau mengandung DATA invoice (nomor, nama, angka).
    // Dekorasi murni biasanya teks kosong / 1 kata pendek / svg.
    const looksDecorative =
      el.tagName === 'SVG' ||
      text.length === 0 ||
      (/^(paid|unpaid|overdue|lunas|invoice)$/i.test(text) && /absolute|rotate|fixed/i.test(cls));
    // Watermark angka raksasa (MinimalisMono: text-[110px])
    const isWatermark =
      /110px|90px|80px/.test(cls) || (text.length <= 4 && /text-\[|font-thin/.test(cls));
    if (looksDecorative || isWatermark) {
      // Kecuali badge status absolute yang PENTING (Freelance/Retro):
      // pindahkan jadi static di bawah header, bukan dihapus.
      if (/^(paid|unpaid|overdue|lunas)$/i.test(text)) {
        el.removeAttribute('class');
        el.setAttribute(
          'style',
          'display:inline-block;padding:4px 12px;margin:8px 0;'
          + 'border:2px solid #111111;border-radius:8px;'
          + 'font-size:12px;font-weight:700;color:#111111;background:#ffffff;',
        );
        continue;
      }
      el.remove();
    }
  }
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

// =====================================================
// KONVERTER LAYOUT EMAIL-SAFE (inti perbaikan screenshot)
// Gmail TIDAK mendukung: display:flex, display:grid, gap,
// justify-between, items-center, grid-cols-3. Kalau dibiarkan,
// kolom-kolom (3 kotak hitam, header kiri-kanan, subtotal)
// akan SALING MENIMPA seperti di screenshot.
// Solusi: ubah container flex/grid baris tunggal menjadi
// <table><tr><td> dengan lebar proporsional + vertical-align.
// Fungsi ini jalan di HASIL CLONE (sudah inline style),
// jadi tidak mengubah tampilan editor sama sekali.
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

// Ambil lebar grid-template-columns, misal "1fr 1fr 1fr" atau
// "repeat(3, minmax(0px, 1fr))". Kembalikan jumlah kolom.
function gridColumnCount(el) {
  const m = (el.getAttribute('style') || '').match(
    /grid-template-columns\s*:\s*([^;]+)/i,
  );
  if (!m) return el.children.length || 1;
  const def = m[1].trim();
  const repeat = def.match(/repeat\(\s*(\d+)/i);
  if (repeat) return parseInt(repeat[1], 10);
  const parts = def.split(/\s+/).filter(Boolean);
  return Math.max(1, parts.length);
}

// Hitung lebar td dari flex anak (flex:1 -> rata, w-1/2 -> 50%).
function childWidths(container, count) {
  const widths = [];
  const kids = [...container.children].filter(
    (k) => k instanceof Element && k.tagName !== 'SCRIPT' && k.tagName !== 'STYLE',
  );
  for (const kid of kids) {
    const s = (kid.getAttribute('style') || '').toLowerCase();
    const w = s.match(/width\s*:\s*([^;]+)/);
    if (w) {
      widths.push(w[1].trim());
      continue;
    }
    const flex = s.match(/flex(?:-grow)?\s*:\s*([^;]+)/);
    if (flex && /^\d/.test(flex[1].trim())) {
      widths.push('*');
      continue;
    }
    widths.push('*');
  }
  while (widths.length < count) widths.push('*');
  // '*' = rata: 100/count %
  const auto = (100 / count).toFixed(2) + '%';
  return widths.map((w) => (w === '*' ? auto : w));
}

// Ubah container flex/grid menjadi table.
function flexGridToTable(container, colCount) {
  const doc = container.ownerDocument;
  const kids = [...container.children].filter(
    (k) => k instanceof Element && k.tagName !== 'SCRIPT' && k.tagName !== 'STYLE',
  );
  if (!kids.length) return;

  const widths = childWidths(container, colCount || kids.length);
  const table = doc.createElement('table');
  table.setAttribute('width', '100%');
  table.setAttribute('cellpadding', '0');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border', '0');
  table.setAttribute(
    'style',
    'width:100%;border-collapse:collapse;border-spacing:0;',
  );

  const tr = doc.createElement('tr');
  kids.forEach((kid, i) => {
    const td = doc.createElement('td');
    td.setAttribute('valign', 'top');
    const w = widths[i] || widths[widths.length - 1];
    if (w && !w.includes('*')) td.setAttribute('width', w);
    // Warisi align: justify-between -> td terakhir rata kanan,
    // items-center -> vertical middle.
    const cs = styleOf(container);
    let tdStyle = 'vertical-align:top;padding:0;';
    if (/align-items\s*:\s*center/.test(cs)) tdStyle = 'vertical-align:middle;padding:0;';
    if (/justify-(content\s*:\s*)?(space-between|between|end|flex-end)/.test(cs) && i === kids.length - 1) {
      tdStyle += 'text-align:right;';
    }
    td.setAttribute('style', tdStyle);
    // Pindahkan isi anak ke td (bukan anaknya, supaya
    // background/padding kotak hitam tetap di dalam td).
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

export function convertToEmailSafeLayout(root) {
  // Proses dari DALAM ke LUAR (deepest first) supaya
  // container bersarang (flex di dalam flex) ikut rapi.
  const all = [root, ...root.querySelectorAll('*')].reverse();
  for (const el of all) {
    if (!(el instanceof Element)) continue;
    if (!el.isConnected) continue;
    const tag = el.tagName;
    // Jangan ubah table asli (tabel item invoice) & struktur email.
    if (tag === 'TABLE' || tag === 'TR' || tag === 'TD' || tag === 'TH') continue;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK') continue;
    // Hanya konversi yang anaknya elemen (bukan teks murni).
    const elementKids = [...el.children].filter(
      (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
    );
    if (elementKids.length < 2 && !isGrid(el)) continue;
    if (elementKids.length < 1) continue;

    if (isGrid(el)) {
      const cols = gridColumnCount(el);
      // Grid 1 kolom tidak perlu diubah.
      if (cols <= 1 && elementKids.length <= 1) continue;
      flexGridToTable(el, cols);
    } else if (isFlexRow(el) && elementKids.length >= 2) {
      flexGridToTable(el, elementKids.length);
    }
  }
}

    inlineComputedStyles(previewEl, clone);
    // Konversi flex/grid -> table agar tidak menimpa di Gmail.
    convertToEmailSafeLayout(clone);
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
