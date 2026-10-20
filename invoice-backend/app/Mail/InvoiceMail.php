<?php

namespace App\Mail;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Services\InvoiceEmailTemplateRenderer;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Invoice $invoice,
        public string $pdfData,
        public ?string $previewHtml = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invoice ' . $this->invoice->invoice_number,
        );
    }

    public function content(): Content
    {
        $previewHtml = trim((string) $this->previewHtml);

        // Kalau frontend mengirim preview HTML (hasil render template
        // yang persis dilihat user), pakai itu sebagai isi email supaya
        // tampilannya sama dengan preview di editor.
        // Kalau tidak ada, fallback ke template Blade bawaan agar
        // pengiriman lama tetap jalan (tidak error 422).
        if ($previewHtml !== '' && strlen($previewHtml) >= 100) {
            return new Content(
                htmlString: $this->wrapPreviewHtml($previewHtml),
            );
        }

        return new Content(
            htmlString: app(InvoiceEmailTemplateRenderer::class)->render($this->invoice),
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(
                fn () => $this->pdfData,
                'Invoice-' . $this->invoice->invoice_number . '.pdf'
            )->withMime('application/pdf'),
        ];
    }

    /**
     * Sanitasi HTML preview dari frontend.
     * Frontend SUDAH mengirim HTML email-friendly (inline computed
     * style, tanpa class Tailwind, tanpa oklch). Di sini kita TIDAK
     * membungkus ulang dengan layout generik — desain asli template
     * yang dipilih user dipakai apa adanya sebagai body email.
     * Yang dilakukan hanya anti-XSS: buang <script>/<style>/<link>,
     * event handler (onclick=...), dan javascript: URL.
     * Kalau yang dikirim ternyata dokumen HTML lengkap, pakai
     * langsung tanpa dibungkus lagi (biar tidak double <html>).
     */
    protected function wrapPreviewHtml(string $html): string
    {
        $clean = (string) preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $html);
        $clean = (string) preg_replace('/<style\b[^>]*>.*?<\/style>/is', '', $clean);
        $clean = (string) preg_replace('/<link\b[^>]*>/i', '', $clean);
        $clean = (string) preg_replace('/\son[a-z]+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $clean);
        $clean = (string) preg_replace('/(href|src)\s*=\s*(["\'])\s*javascript:[^"\']*\2/i', '$1="#"', $clean);
        $clean = trim($clean);

        // Dokumen HTML lengkap dari frontend -> pakai langsung.
        if (preg_match('/<html[\s>]/i', $clean) === 1) {
            return $clean;
        }

        $invoiceNumber = e($this->invoice->invoice_number ?? '');

        return <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice {$invoiceNumber}</title>
<style>img{max-width:100%!important;height:auto!important}table{border-collapse:collapse!important}</style>
</head>
<body style="margin:0;padding:24px 12px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.5;">
<div style="max-width:760px;margin:0 auto;background:#ffffff;">{$clean}</div>
</body>
</html>
HTML;
    }
}
