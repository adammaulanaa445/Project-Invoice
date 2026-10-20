// =====================================================
// EMAIL PREVIEW EXPORTER
// Mengubah preview invoice di editor menjadi HTML email yang
// 100% AMAN, RAPI, TIDAK SALING MENUMPUK, dan PERSIS
// SESUAI DENGAN DESAIN TEMPLATE YANG DIPILIH USER.
// Kompatibel: Gmail Web, Gmail App, Outlook, Apple Mail, Yahoo.
// =====================================================

// Properti CSS yang aman dan penting disalin dari computed style ke inline style email.
const INLINE_PROPS = [
  'display',
  'box-sizing',
  'width', 'min-width', 'max-width',
  'min-height',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'color', 'background', 'background-color',
  'font', 'font-family', 'font-size', 'font-weight', 'font-style',
  'line-height', 'letter-spacing',
  'text-align', 'text-transform', 'text-decoration',
  'text-decoration-line', 'text-decoration-color', 'text-decoration-style',
  'vertical-align', 'white-space', 'word-break',
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

// Properti yang TIDAK AMAN di email client karena menyebabkan teks saling menumpuk.
export const EMAIL_UNSAFE_PATTERNS = [
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
// PENCEGAHAN AUTO-LINK GMAIL (TEKS JADI BIRU)
// Gmail otomatis membungkus email, nomor HP, tanggal, alamat
// menjadi <a style="color:#1155cc"> biru bergaris bawah.
// Kita sisipkan zero-width non-joiner (&zwnj;) agar Gmail
// tidak mendeteksinya sebagai tautan, namun tetap terbaca rapi.
// =====================================================
function neutralizeGmailAutoLinks(text) {
  if (!text || typeof text !== 'string') return text;

  // Netralkan format email: user@domain.com -> user&zwnj;@&zwnj;domain.com
  let res = text.replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '$1&zwnj;@&zwnj;$2');

  // Netralkan format nomor telepon: 08xx / +62 / 123-456
  res = res.replace(/(\+?\d{2,4})[-.\s]?(\d{3,4})[-.\s]?(\d{3,5})/g, (match, p1, p2, p3) => {
    return `${p1}&zwnj;${p2}&zwnj;${p3}`;
  });

  return res;
}

// Terapkan netralisasi auto-link ke seluruh text node di dalam DOM clone
function applyAntiAutoLinksToDom(root) {
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const node of textNodes) {
    if (node.parentElement && ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) continue;
    const original = node.nodeValue || '';
    if (/@|\+?\d{3,}/.test(original)) {
      const sanitized = neutralizeGmailAutoLinks(original);
      if (sanitized !== original) {
        // Ganti dengan HTML fragment yang aman
        const temp = root.ownerDocument.createElement('span');
        temp.innerHTML = sanitized;
        node.replaceWith(...temp.childNodes);
      }
    }
  }
}

// =====================================================
// INLINE COMPUTED STYLES (TREE-TRAVERSAL PARALEL)
// Menyalin computed styles langsung secara berpasangan
// antara node source dan clone sehingga 100% SINKRON
// tanpa ada pergeseran indeks (anti-salah alamat).
// =====================================================
export function inlineComputedStyles(source, target) {
  // Traversal paralel rekursif dari akar ke daun
  function syncElementStyles(srcEl, dstEl) {
    if (!(srcEl instanceof Element) || !(dstEl instanceof Element)) return;

    const computed = window.getComputedStyle(srcEl);

    // Jika elemen di browser display:none, sembunyikan di email
    if (computed.getPropertyValue('display') === 'none') {
      dstEl.setAttribute('style', 'display:none;');
      dstEl.removeAttribute('class');
      return;
    }

    const parts = [];
    const existing = dstEl.getAttribute('style');
    if (existing) parts.push(existing.replace(/;\s*$/, ''));

    for (const prop of INLINE_PROPS) {
      if (isUnsafeProp(prop)) continue;
      const v = (computed.getPropertyValue(prop) || '').trim();
      if (!v) continue;
      if (v === 'none' && prop !== 'display') continue;
      if (v === 'normal' || v === 'auto') continue;
      if (v.startsWith('oklch') || v.startsWith('oklab')) continue;
      if (/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/i.test(v)) continue;

      parts.push(prop + ':' + v);
    }

    // --- FIX: gradient-text & transparent color ---
    const computedColor = (computed.getPropertyValue('color') || '').trim();
    const bgImage = (computed.getPropertyValue('background-image') || '').trim();
    const isTransparentText =
      computedColor === 'transparent' ||
      computedColor === 'rgba(0, 0, 0, 0)' ||
      computedColor.replace(/\s+/g, '') === 'rgba(0,0,0,0)';

    if (isTransparentText) {
      const firstColor = (bgImage.match(/(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{3,8})/) || [])[1];
      const fallbackColor = firstColor || '#1e293b';
      parts.push('color:' + fallbackColor);
      parts.push('background-image:none');
      parts.push('-webkit-text-fill-color:' + fallbackColor);
    } else if (/gradient/i.test(bgImage)) {
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

    // --- ANTI MENUMPUK: Lepas height kaku pada container pembungkus teks ---
    // Di email client, font fallback ukurannya bisa beda sedikit.
    // Jika container dikunci dengan fixed height (misal 32px), teks menabrak baris bawah.
    if (!['IMG', 'SVG', 'CANVAS', 'HR'].includes(dstEl.tagName)) {
      parts.push('height:auto');
    }

    // --- ANTI TEKS BIRU: Paksa tag <a> warisi warna sekitarnya ---
    if (dstEl.tagName === 'A') {
      const parentColor = (computed.getPropertyValue('color') || '').trim();
      const safeColor = (parentColor && !parentColor.includes('oklch') && !isTransparentText)
        ? parentColor
        : 'inherit';
      parts.push('color:' + safeColor + '!important');
      parts.push('text-decoration:none!important');
    }

    if (parts.length) {
      dstEl.setAttribute('style', parts.join(';'));
    }
    dstEl.removeAttribute('class');

    // Sinkronisasi anak-anak elemen secara berurutan
    const srcChildren = [...srcEl.children];
    const dstChildren = [...dstEl.children];
    const count = Math.min(srcChildren.length, dstChildren.length);
    for (let i = 0; i < count; i++) {
      syncElementStyles(srcChildren[i], dstChildren[i]);
    }
  }

  syncElementStyles(source, target);
}

// =====================================================
// SANITIZE CLONE
// Membersihkan script dan elemen yang tidak relevan
// =====================================================
export function sanitizeClone(root) {
  root.querySelectorAll('script,style,link').forEach((n) => n.remove());

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

  // Tangani elemen absolute agar tidak saling menumpuk:
  // Watermark angka raksasa di-remove agar tidak menimpa teks isi.
  // Badge status dibuat statis rapi.
  const absoluteElements = root.querySelectorAll('[class*="absolute"], [style*="position:absolute"], [style*="position: absolute"]');
  for (const el of absoluteElements) {
    const text = (el.textContent || '').trim();
    const styleAttr = (el.getAttribute('style') || '').toLowerCase();
    const classAttr = (el.getAttribute('class') || '').toLowerCase();

    // Watermark angka raksasa yang menimpa
    const isGiantWatermark = /110px|90px|80px|text-\[|font-thin/.test(classAttr + styleAttr) && text.length <= 6;
    if (isGiantWatermark) {
      el.remove();
      continue;
    }

    // Badge status (Paid, Unpaid, Lunas) diubah menjadi elemen statis yang rapi
    if (/^(paid|unpaid|overdue|lunas|invoice)$/i.test(text)) {
      el.style.position = 'static';
      el.style.display = 'inline-block';
      el.style.margin = '4px 0';
    }
  }
}

// =====================================================
// KONVERTER LAYOUT EMAIL-SAFE (flex/grid -> table)
// Mengubah container baris tingkat atas menjadi tabel email
// sehingga layout 2 kolom (header, info, total) tetap
// berdampingan sempurna di Gmail tanpa menumpuk.
// =====================================================

function styleOf(el) {
  return (el.getAttribute('style') || '').toLowerCase();
}

export function isFlexRow(el) {
  const s = styleOf(el);
  if (!/display\s*:\s*flex/.test(s)) return false;
  if (/flex-direction\s*:\s*column/.test(s)) return false;
  return true;
}

export function gridColumnCount(el) {
  const m = (el.getAttribute('style') || '').match(/grid-template-columns\s*:\s*([^;]+)/i);
  if (!m) return el.children.length || 1;
  const def = m[1].trim();
  const repeat = def.match(/repeat\(\s*(\d+)/i);
  if (repeat) return parseInt(repeat[1], 10);
  return Math.max(1, def.split(/\s+/).filter(Boolean).length);
}

// Konversi hanya kontainer utama (2 atau 3 anak kolom horizontal)
function flexGridToTable(container, colCount) {
  const doc = container.ownerDocument;
  const kids = [...container.children].filter(
    (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
  );
  if (!kids.length) return;

  const table = doc.createElement('table');
  table.setAttribute('width', '100%');
  table.setAttribute('cellpadding', '0');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border', '0');
  table.setAttribute('role', 'presentation');

  // Pertahankan padding / background asli dari container
  const cStyle = container.getAttribute('style') || '';
  const cleanParentStyle = cStyle
    .replace(/display\s*:[^;]+;?/gi, '')
    .replace(/flex-direction\s*:[^;]+;?/gi, '')
    .replace(/justify-content\s*:[^;]+;?/gi, '')
    .replace(/align-items\s*:[^;]+;?/gi, '')
    .replace(/gap\s*:[^;]+;?/gi, '');

  table.setAttribute(
    'style',
    'width:100%;border-collapse:collapse;border-spacing:0;table-layout:fixed;' + cleanParentStyle,
  );

  const tr = doc.createElement('tr');
  const count = colCount || kids.length;
  const colWidthPct = (100 / count).toFixed(2) + '%';
  const isBetweenOrEnd = /justify-content\s*:\s*(space-between|between|flex-end|end)/i.test(cStyle);

  kids.forEach((kid, i) => {
    const td = doc.createElement('td');
    td.setAttribute('valign', 'top');
    td.setAttribute('width', colWidthPct);

    let tdStyle = 'vertical-align:top;padding:0;width:' + colWidthPct + ';';
    if (isBetweenOrEnd && i === kids.length - 1) {
      tdStyle += 'text-align:right;';
    }
    td.setAttribute('style', tdStyle);

    // Pindahkan isi kid ke td
    const wrapper = doc.createElement('div');
    const kidStyle = kid.getAttribute('style') || '';
    wrapper.setAttribute('style', kidStyle);
    while (kid.firstChild) {
      wrapper.appendChild(kid.firstChild);
    }
    td.appendChild(wrapper);
    tr.appendChild(td);
  });

  table.appendChild(tr);
  container.replaceWith(table);
}

export function convertToEmailSafeLayout(root) {
  // Hanya proses container flex/grid tingkat atas yang memiliki 2 atau 3 anak
  // Jangan ubah tabel asli (tabel item invoice) atau badge-badge kecil
  const all = [...root.querySelectorAll('*')].reverse();
  for (const el of all) {
    if (!(el instanceof Element) || !el.isConnected) continue;
    const tag = el.tagName;
    if (['TABLE', 'TR', 'TD', 'TH', 'THEAD', 'TBODY', 'TFOOT', 'SPAN', 'A', 'BUTTON', 'P'].includes(tag)) continue;

    const elementKids = [...el.children].filter(
      (k) => k instanceof Element && !['SCRIPT', 'STYLE'].includes(k.tagName),
    );

    // Hanya konversi kontainer utama (2 atau 3 anak kolom horizontal)
    if (elementKids.length >= 2 && elementKids.length <= 4) {
      const isGridContainer = /display\s*:\s*(grid|inline-grid)/i.test(styleOf(el));
      const isFlexContainer = isFlexRow(el);

      if (isGridContainer) {
        flexGridToTable(el, gridColumnCount(el));
      } else if (isFlexContainer) {
        flexGridToTable(el, elementKids.length);
      }
    }
  }
}

// =====================================================
// CSS HEAD KHUSUS GMAIL & EMAIL CLIENTS
// Mengunci font, warna, dan mematikan auto-link biru Gmail.
// =====================================================
function gmailHeadStyle() {
  return '<style>'
    // Reset dasar tabel dan gambar
    + 'img{max-width:100%!important;height:auto!important;display:block;border:0;outline:none;}'
    + 'table{border-collapse:collapse!important;mso-table-lspace:0pt;mso-table-rspace:0pt;}'
    + 'td{border-collapse:collapse!important;}'
    // Reset universal untuk semua tautan (mencegah teks jadi biru bergaris bawah)
    + 'a,a:link,a:visited,a:hover,a:active{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + 'font-family:inherit!important;'
    + 'font-size:inherit!important;'
    + 'font-weight:inherit!important;'
    + 'line-height:inherit!important;'
    + '}'
    // Override spesifik mesin rendering Gmail
    + 'u + #body a{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + '}'
    + '#MessageViewBody a{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + '}'
    + '.gmail a, .gmail-blend a{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + '}'
    + 'span.MsoHyperlink, span[style*="color:windowtext"]{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + '}'
    // Reset Apple Mail Data Detectors
    + '[x-apple-data-detectors], [x-apple-data-detectors] *{'
    + 'color:inherit!important;'
    + 'text-decoration:none!important;'
    + 'font-size:inherit!important;'
    + 'font-family:inherit!important;'
    + 'font-weight:inherit!important;'
    + 'line-height:inherit!important;'
    + '}'
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
    // 1. Buat klon dari preview invoice
    const clone = previewEl.cloneNode(true);

    // 2. Salin computed style secara rekursif tree-traversal (100% SINKRON)
    inlineComputedStyles(previewEl, clone);

    // 3. Sanitasi script dan elemen berbahaya
    sanitizeClone(clone);

    // 4. Konversi kontainer flex/grid tingkat atas menjadi tabel email yang aman
    convertToEmailSafeLayout(clone);

    // 5. Terapkan netralisasi auto-link Gmail (zero-width characters)
    applyAntiAutoLinksToDom(clone);

    // Ambil warna latar belakang dan warna teks dari template yang dipilih
    const rootComputed = window.getComputedStyle(previewEl);
    const invoiceBg = rootComputed.backgroundColor && rootComputed.backgroundColor !== 'rgba(0, 0, 0, 0)'
      ? rootComputed.backgroundColor
      : '#ffffff';
    const invoiceColor = rootComputed.color && rootComputed.color !== 'rgba(0, 0, 0, 0)'
      ? rootComputed.color
      : '#0f172a';

    // Pastikan root wrapper invoice bersih dan tidak tumpang tindih
    clone.style.position = 'static';
    clone.style.display = 'block';
    clone.style.width = '100%';
    clone.style.maxWidth = '800px';
    clone.style.margin = '0 auto';
    clone.style.boxSizing = 'border-box';

    const innerHtml = clone.outerHTML;
    const invoiceNumber = escapeHtml(meta.invoiceNumber || '');
    const fromName = escapeHtml(meta.fromName || 'kami');
    const toName = escapeHtml(meta.toName || 'Bapak/Ibu');
    const title = invoiceNumber ? ' #' + invoiceNumber : '';

    html = '<!DOCTYPE html>'
      + '<html lang="id" xmlns="http://www.w3.org/1999/xhtml">'
      + '<head>'
      + '<meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
      + '<meta name="color-scheme" content="light">'
      + '<meta name="supported-color-schemes" content="light">'
      + '<title>Invoice' + title + '</title>'
      + gmailHeadStyle()
      + '</head>'
      + '<body id="body" class="gmail" style="margin:0;padding:24px 12px;background:#f1f5f9;'
      + 'font-family:Arial,Helvetica,sans-serif;color:#1e293b;line-height:1.5;">'

      // Outer container
      + '<div style="max-width:820px;margin:0 auto;width:100%;">'

      // --- KARTU SAPAAN RESMI ---
      + '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:20px;'
      + 'box-shadow:0 1px 3px rgba(0,0,0,0.05);">'
      + '<p style="margin:0 0 6px;font-size:15px;color:#0f172a;font-weight:600;">Halo ' + toName + ',</p>'
      + '<p style="margin:0 0 10px;font-size:14px;color:#475569;line-height:1.6;">'
      + 'Berikut adalah rincian tagihan resmi dari <strong>' + fromName + '</strong>' + title + '.'
      + ' Tampilan invoice di bawah ini sesuai dengan format resmi yang diterbitkan.'
      + '</p>'
      + '<div style="display:inline-block;padding:6px 12px;background:#f8fafc;border:1px solid #e2e8f0;'
      + 'border-radius:6px;font-size:12px;color:#64748b;">'
      + '📎 <strong>PDF Resmi Terlampir:</strong> Anda juga dapat mengunduh atau mencetak file PDF yang terlampir pada email ini.'
      + '</div>'
      + '</div>'

      // --- KONTEN INVOICE ASLI (PERSIS SESUAI TEMPLATE) ---
      + '<div style="background:' + invoiceBg + ';color:' + invoiceColor + ';border:1px solid #e2e8f0;'
      + 'border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);width:100%;box-sizing:border-box;">'
      + innerHtml
      + '</div>'

      // --- FOOTER EMAIL ---
      + '<div style="margin-top:20px;text-align:center;font-size:12px;color:#94a3b8;line-height:1.6;">'
      + '<p style="margin:0;">Invoice ini diterbitkan secara resmi melalui sistem invoice kami.</p>'
      + '<p style="margin:4px 0 0;">Jika ada pertanyaan, silakan hubungi pengirim tagihan ini.</p>'
      + '</div>'

      + '</div>'
      + '</body>'
      + '</html>';

  } finally {
    previewEl.classList.remove('pdf-export');
  }

  const clean = String(html).trim();
  if (clean.length < 100 || !/<(div|table|section|article)/i.test(clean)) {
    throw new Error('HTML preview invoice tidak valid.');
  }

  return clean;
}
