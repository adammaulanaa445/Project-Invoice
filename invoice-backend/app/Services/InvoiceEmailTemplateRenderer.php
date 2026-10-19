<?php

namespace App\Services;

use App\Models\Invoice;
use Spatie\Browsershot\Browsershot;

class InvoiceEmailTemplateRenderer
{
    public function renderPreviewImage(Invoice $invoice): string
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
            ->setDelay(500)
            ->windowSize(1200, 900)
            ->fullPage();

        $chromePath = config('services.browsershot.chrome_path');
        if ($chromePath) {
            $browser->setChromePath($chromePath);
        }

        // Screenshot keeps the selected Svelte template exactly as rendered.
        // It also avoids Browsershot::evaluate(), whose Chromium response can
        // be an array while Browsershot v5.4 expects a string.
        return $browser->screenshot();
    }
}
