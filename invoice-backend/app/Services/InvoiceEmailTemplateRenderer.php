<?php

namespace App\Services;

use App\Models\Invoice;
use Spatie\Browsershot\Browsershot;

class InvoiceEmailTemplateRenderer
{
    public function render(Invoice $invoice): string
    {
        $frontendUrl = rtrim((string) config('services.frontend.url'), '/');

        if ($frontendUrl === '' || !filter_var($frontendUrl, FILTER_VALIDATE_URL)) {
            throw new \RuntimeException('FRONTEND_URL harus berupa URL absolut yang valid.');
        }

        $printUrl = "{$frontendUrl}/print/invoice/{$invoice->id}?token=" . rawurlencode($invoice->print_token);
        $browser = Browsershot::url($printUrl)
            ->addChromiumArguments([
                'no-sandbox',
                'disable-setuid-sandbox',
            ])
            ->waitUntilNetworkIdle()
            ->waitForFunction('document.querySelector(".print-wrapper") && !document.querySelector(".print-pending")')
            ->setDelay(500);

        $chromePath = config('services.browsershot.chrome_path');
        if ($chromePath) {
            $browser->setChromePath($chromePath);
        }

        $payload = $browser->evaluate(<<<'JS'
() => {
    const source = document.querySelector('.print-wrapper');
    if (!source) throw new Error('Preview invoice tidak ditemukan.');

    const clone = source.cloneNode(true);
    const sourceNodes = [source, ...source.querySelectorAll('*')];
    const cloneNodes = [clone, ...clone.querySelectorAll('*')];

    sourceNodes.forEach((node, index) => {
        const target = cloneNodes[index];
        const style = window.getComputedStyle(node);
        const inline = Array.from(style).map((property) => `${property}:${style.getPropertyValue(property)};`).join('');
        target.setAttribute('style', inline);
        target.removeAttribute('class');
        target.removeAttribute('id');
    });

    clone.querySelectorAll('script, style, link, button, input, textarea, select').forEach((node) => node.remove());

    return JSON.stringify({
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:24px 12px;background:#f4f6f8;">${clone.outerHTML}</body></html>`
    });
}
JS
        );

        $decodedPayload = json_decode($payload, true);
        $html = is_array($decodedPayload) ? ($decodedPayload['html'] ?? null) : null;

        // Chromium/Puppeteer tertentu mengembalikan hasil evaluate langsung
        // sebagai string HTML, bukan string JSON. Keduanya valid dan harus
        // dipakai tanpa memunculkan JsonException "Syntax error".
        if (! is_string($html) && str_contains($payload, '<')) {
            $html = $payload;
        }

        if (! is_string($html)) {
            throw new \RuntimeException('HTML preview invoice tidak valid.');
        }

        return $html;
    }
}
