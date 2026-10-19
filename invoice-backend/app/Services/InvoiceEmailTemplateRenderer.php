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

        // Avoid evaluate(): Chromium/Puppeteer returns an array for it in the
        // server runtime. bodyHtml() returns the completed Svelte DOM string.
        $html = $browser->bodyHtml();

        // Scripts are useless in email, while the rendered document structure
        // and template styles remain available to the recipient.
        $html = preg_replace('/<script\\b[^>]*>.*?<\\/script>/is', '', $html) ?? $html;
        $html = str_replace(['href="/_app/', "href='/_app/"], ["href=\"{$frontendUrl}/_app/", "href='{$frontendUrl}/_app/"], $html);

        return $html;
    }
}
