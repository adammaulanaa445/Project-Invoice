<?php

namespace App\Mail;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ScheduledInvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public Invoice $invoice;
    public string $pdfPath;

    public function __construct(Invoice $invoice, string $pdfPath)
    {
        $this->invoice = $invoice;
        $this->pdfPath = $pdfPath;
    }

    public function build()
    {
        return $this->subject("Invoice {$this->invoice->invoice_number}")
            ->view('emails.scheduled-invoice')
            ->with(['invoice' => $this->invoice])
            ->attach($this->pdfPath, [
                'as' => "Invoice-{$this->invoice->invoice_number}.pdf",
                'mime' => 'application/pdf',
            ]);
    }
}
