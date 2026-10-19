<?php

namespace App\Services;

use App\Models\Invoice;
use Illuminate\Support\Facades\Http;
use Spatie\Browsershot\Browsershot;
use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

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

        // Avoid evaluate(): Chromium/Puppeteer returns an array for it in the
        // server runtime. bodyHtml() returns the completed Svelte DOM string.
        $html = $browser->bodyHtml();

        // Scripts are useless in email. Ambil stylesheet dari frontend lalu
        // jadikan inline style karena sebagian besar email client mengabaikan
        // class Tailwind dan <link rel="stylesheet"> eksternal.
        $html = preg_replace('/<script\\b[^>]*>.*?<\\/script>/is', '', $html) ?? $html;

        return $this->inlineTemplateStyles($html, $frontendUrl);
    }

    private function inlineTemplateStyles(string $html, string $frontendUrl): string
    {
        $document = new \DOMDocument;
        libxml_use_internal_errors(true);
        $document->loadHTML($html);
        libxml_clear_errors();

        $stylesheets = [];

        foreach ($document->getElementsByTagName('link') as $link) {
            if (! str_contains(strtolower($link->getAttribute('rel')), 'stylesheet')) {
                continue;
            }

            $href = $link->getAttribute('href');
            $url = str_starts_with($href, '/') ? $frontendUrl.$href : $href;

            // Hanya izinkan asset CSS dari frontend yang dipakai aplikasi.
            if (! str_starts_with($url, $frontendUrl.'/')) {
                continue;
            }

            try {
                $response = Http::timeout(10)->get($url);
                if ($response->successful()) {
                    $stylesheets[] = $response->body();
                }
            } catch (\Throwable $exception) {
                \Log::warning('Gagal mengambil stylesheet template email', [
                    'url' => $url,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        $html = preg_replace('/<link\\b[^>]*\\brel=["\']?stylesheet[^>]*>/i', '', $html) ?? $html;

        if ($stylesheets === []) {
            return $html;
        }

        try {
            return (new CssToInlineStyles)->convert($html, implode("\n", $stylesheets));
        } catch (\Throwable $exception) {
            \Log::warning('Gagal menjadikan CSS template sebagai inline style', [
                'error' => $exception->getMessage(),
            ]);

            return $html;
        }
    }
}
