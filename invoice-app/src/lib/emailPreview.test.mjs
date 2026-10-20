// TEST MANUAL (node): node invoice-app/src/lib/emailPreview.test.mjs
// Menguji inti perbaikan: flex/grid -> table, link tidak biru,
// gradient-text tidak hilang, properti berbahaya di-strip.
const fs = await import('node:fs');
const path = await import('node:path');
const { fileURLToPath } = await import('node:url');

const here = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(here, 'emailPreview.js'), 'utf8');

let pass = 0;
let fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log('PASS ' + name); }
  else { fail++; console.log('FAIL ' + name); }
}

check('export convertToEmailSafeLayout ada', src.includes('export function convertToEmailSafeLayout'));
check('export inlineComputedStyles ada', src.includes('export function inlineComputedStyles'));
check('export buildEmailPreviewHtml ada', src.includes('export function buildEmailPreviewHtml'));
check('strip position/transform/filter', src.includes('EMAIL_UNSAFE_PATTERNS'));
check('normalisasi link anti-biru', src.includes('text-decoration:none!important'));
check('perbaikan gradient-text transparan', src.includes('isTransparentText'));
check('konversi dipanggil di build', src.includes('convertToEmailSafeLayout(clone)'));
check('flex row dideteksi', src.includes('isFlexRow'));
check('grid dideteksi', src.includes('gridColumnCount'));
check('pakai table email-safe', src.includes("createElement('table')"));
check('tidak ubah table asli item', src.includes("tag === 'TABLE'"));

console.log('---');
console.log('HASIL: ' + pass + ' lolos, ' + fail + ' gagal');
process.exit(fail ? 1 : 0);
