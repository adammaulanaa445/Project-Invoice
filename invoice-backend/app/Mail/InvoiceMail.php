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
     * Bungkus HTML preview dari frontend jadi email yang aman.
     * - Buang <script> / event handler / javascript: URL (anti-XSS).
     * - Bungkus dengan header + container sederhana supaya tetap
     *   terbaca walau class Tailwind tidak ada di email client.
     */
    protected function wrapPreviewHtml(string $html): string
    {
        $clean = (string) preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $html);

        // Buang event handler seperti onclick="..." / onerror="..."
        $clean = (string) preg_replace('/\s+on[a-z]+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $clean);

        // Netralkan javascript: URL
        $clean = (string) preg_replace('/(href|src)\s*=\s*(["\'])\s*javascript:[^"\']*\2/i', '$1="#"', $clean);

        $invoiceNumber = e($this->invoice->invoice_number ?? '');
        $fromName = e($this->invoice->from_name ?? 'kami');
        $toName = e($this->invoice->to_name ?? 'Bapak/Ibu');

        return <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice {$invoiceNumber}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.5;">
<div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;">
<p style="margin:0 0 8px;">Halo {$toName},</p>
<p style="margin:0 0 16px;">Berikut invoice dari <strong>{$fromName}</strong> (#{$invoiceNumber}). Tampilan persis seperti preview di aplikasi. PDF resmi tetap terlampir.</p>
<div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;padding:16px;">{$clean}</div>
<p style="margin:16px 0 0;font-size:12px;color:#64748b;">PDF invoice resmi terlampir untuk disimpan atau dicetak.</p>
</div>
</body>
</html>
HTML;
    }
}
