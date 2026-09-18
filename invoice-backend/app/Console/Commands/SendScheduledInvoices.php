<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\ScheduledInvoiceEmail;

use App\Mail\InvoiceMail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class SendScheduledInvoices extends Command
{
    protected $signature =
        'invoices:send-scheduled';


    protected $description =
        'Mengirim invoice yang sudah mencapai jadwal pengiriman';


    public function handle()
    {
        $scheduledEmails =
            ScheduledInvoiceEmail::where(
                'status',
                'scheduled'
            )
            ->where(
                'scheduled_at',
                '<=',
                now()
            )
            ->with('invoice')
            ->get();


        if (
            $scheduledEmails->isEmpty()
        ) {

            $this->info(
                'Tidak ada invoice yang perlu dikirim.'
            );

            return self::SUCCESS;
        }


        foreach (
            $scheduledEmails
            as $scheduledEmail
        ) {

            try {

                $invoice =
                    $scheduledEmail->invoice;


                // Invoice tidak ditemukan
                if (!$invoice) {

                    $scheduledEmail->update([
                        'status' =>
                            'failed'
                    ]);

                    continue;
                }


                // PDF tidak ditemukan
                if (
                    !Storage::exists(
                        $scheduledEmail->pdf_path
                    )
                ) {

                    $scheduledEmail->update([
                        'status' =>
                            'failed'
                    ]);


                    Log::error(
                        'PDF scheduled invoice tidak ditemukan',
                        [
                            'scheduled_email_id' =>
                                $scheduledEmail->id
                        ]
                    );


                    continue;
                }


                // -------------------------------------
                // AMBIL PDF
                // -------------------------------------

                $pdfData =
                    Storage::get(
                        $scheduledEmail->pdf_path
                    );


                // -------------------------------------
                // LOAD ITEM INVOICE
                // -------------------------------------

                $invoice->load(
                    'items'
                );


                // -------------------------------------
                // KIRIM EMAIL
                // -------------------------------------

                Mail::to(
                    $scheduledEmail
                        ->recipient_email
                )->send(
                    new InvoiceMail(
                        $invoice,
                        $pdfData
                    )
                );


                // -------------------------------------
                // UPDATE STATUS
                // -------------------------------------

                $scheduledEmail->update([
                    'status' =>
                        'sent'
                ]);


                // -------------------------------------
                // HAPUS PDF
                // -------------------------------------

                Storage::delete(
                    $scheduledEmail->pdf_path
                );


                $this->info(
                    'Invoice #' .
                    $invoice->id .
                    ' berhasil dikirim ke ' .
                    $scheduledEmail
                        ->recipient_email
                );


            } catch (
                \Throwable $e
            ) {

                $scheduledEmail->update([
                    'status' =>
                        'failed'
                ]);


                Log::error(
                    'Gagal mengirim scheduled invoice',
                    [

                        'scheduled_email_id' =>
                            $scheduledEmail->id,

                        'invoice_id' =>
                            $scheduledEmail->invoice_id,

                        'email' =>
                            $scheduledEmail->recipient_email,

                        'error' =>
                            $e->getMessage(),

                    ]
                );


                $this->error(
                    'Gagal mengirim invoice #' .
                    $scheduledEmail->invoice_id .
                    ': ' .
                    $e->getMessage()
                );
            }
        }


        return self::SUCCESS;
    }
}