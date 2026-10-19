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

        // bodyHtml() mengambil DOM yang sudah dirender oleh Svelte sebagai
        // string. Berbeda dengan evaluate(), jalur ini tidak menerima hasil
        // Puppeteer sebagai array pada Chromium/Puppeteer versi server.
        $html = $browser->bodyHtml();

        // HTML yang dikirim email tidak memerlukan JavaScript untuk tampil.
        // CSS dan struktur template tetap dipertahankan supaya desainnya
        // mengikuti template invoice yang dipilih dan teks tetap bisa disalin.
        $html = preg_replace('/<script\\b[^>]*>.*?<\\/script>/is', '', $html) ?? $html;
        $html = str_replace(['href="/_app/', "href='/_app/"], ["href=\"{$frontendUrl}/_app/", "href='{$frontendUrl}/_app/"], $html);
        $html = str_replace(['src="/_app/', "src='/_app/"], ["src=\"{$frontendUrl}/_app/", "src='{$frontendUrl}/_app/"], $html);

        return $html;
    }
}
