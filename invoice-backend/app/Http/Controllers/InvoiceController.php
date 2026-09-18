<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\ScheduledInvoiceEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;

class InvoiceController extends Controller
{
    // =========================================================
    // GET /api/invoices
    // =========================================================

    public function index(Request $request)
    {
        return Invoice::with('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(15);
    }


    // =========================================================
    // POST /api/invoices
    // =========================================================

    public function store(Request $request)
    {
        $data = $request->validate([
            'template_id' => 'required|integer|min:1',

            'issue_date' => 'required|date',

            'due_date' => [
                'required',
                'date',
                'after_or_equal:issue_date'
            ],

            'currency' => 'required|string|size:3',

            'from_name' => 'required|string|max:255',
            'from_address' => 'nullable|string',
            'from_email' => 'nullable|email',
            'from_phone' => 'nullable|string|max:30',
            'logo_url' => 'nullable|string',

            'to_name' => 'required|string|max:255',
            'to_address' => 'nullable|string',
            'to_email' => 'nullable|email',

            'tax_percent' => 'numeric|min:0|max:100',

            // Tetap dipertahankan agar database lama tidak terganggu
            'discount_percent' => 'numeric|min:0|max:100',

            'notes' => 'nullable|string',

            'status' => 'in:unpaid,paid,overdue',

            'items' => 'required|array|min:1',

            'items.*.description' => 'required|string|max:255',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);


        $invoice = Invoice::create([
            ...$data,

            'user_id' => $request->user()->id,

            'invoice_number' =>
                'INV-' . strtoupper(Str::random(6)),
        ]);


        $invoice->items()->createMany(
            $data['items']
        );


        return response()->json(
            $invoice->load('items'),
            201
        );
    }


    // =========================================================
    // GET /api/invoices/{invoice}
    // =========================================================

    public function show(
        Request $request,
        Invoice $invoice
    ) {
        if (
            $invoice->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'message' =>
                    'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }


        return $invoice->load('items');
    }


    // =========================================================
    // PUT /api/invoices/{invoice}
    // =========================================================

    public function update(
        Request $request,
        Invoice $invoice
    ) {
        if (
            $invoice->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'message' =>
                    'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }


        $data = $request->validate([
            'template_id' =>
                'sometimes|integer|min:1',

            'status' =>
                'sometimes|in:unpaid,paid,overdue',

            'tax_percent' =>
                'sometimes|numeric|min:0|max:100',

            // Tetap dipertahankan
            'discount_percent' =>
                'sometimes|numeric|min:0|max:100',

            'notes' =>
                'nullable|string',
        ]);


        $invoice->update($data);


        return $invoice->load('items');
    }


    // =========================================================
    // DELETE /api/invoices/{invoice}
    // =========================================================

    public function destroy(
        Request $request,
        Invoice $invoice
    ) {
        if (
            $invoice->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'message' =>
                    'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }


        $invoice->delete();


        return response()->noContent();
    }


    // =========================================================
    // POST /api/invoices/{invoice}/send-email
    // =========================================================

    public function sendEmail(
        Request $request,
        Invoice $invoice
    ) {
        if (
            $invoice->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'message' =>
                    'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }


        $data = $request->validate([
            'email' =>
                'required|email',

            'pdf' =>
                'required|file|mimes:pdf|max:10240',
        ]);


        try {

            $invoice->load('items');


            $pdfData = file_get_contents(
                $request
                    ->file('pdf')
                    ->getRealPath()
            );


            Mail::to(
                $data['email']
            )->send(
                new InvoiceMail(
                    $invoice,
                    $pdfData
                )
            );


            return response()->json([
                'message' =>
                    'Invoice berhasil dikirim ke email.'
            ]);


        } catch (\Throwable $e) {

            \Log::error(
                'Gagal mengirim invoice email',
                [
                    'invoice_id' =>
                        $invoice->id,

                    'email' =>
                        $data['email'],

                    'error' =>
                        $e->getMessage(),
                ]
            );


            return response()->json([
                'message' =>
                    'Gagal mengirim email.',

                'debug' =>
                    $e->getMessage(),
            ], 500);
        }
    }


    // =========================================================
    // POST /api/invoices/{invoice}/schedule-email
    // =========================================================
    //
    // Fitur:
    // Menjadwalkan invoice agar dikirim otomatis
    // pada tanggal dan waktu tertentu.
    //
    // TIDAK menggunakan tabel subscriptions.
    // =========================================================

    public function scheduleEmail(
        Request $request,
        Invoice $invoice
    ) {
        // -----------------------------------------------------
        // Pastikan invoice milik user yang sedang login
        // -----------------------------------------------------

        if (
            $invoice->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'message' =>
                    'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }


        // -----------------------------------------------------
        // Validasi
        // -----------------------------------------------------

        $data = $request->validate([
            'email' =>
                'required|email',

            'scheduled_at' =>
                'required|date|after:now',

            'pdf' =>
                'required|file|mimes:pdf|max:10240',
        ]);


        // -----------------------------------------------------
        // Simpan PDF
        // -----------------------------------------------------

        $pdfPath = $request
            ->file('pdf')
            ->store('scheduled-invoices');


        // -----------------------------------------------------
        // Simpan jadwal ke database
        // -----------------------------------------------------

        $scheduled =
            ScheduledInvoiceEmail::create([
                'invoice_id' =>
                    $invoice->id,

                'user_id' =>
                    $request->user()->id,

                'recipient_email' =>
                    $data['email'],

                'scheduled_at' =>
                    Carbon::parse(
                        $data['scheduled_at']
                    ),

                'pdf_path' =>
                    $pdfPath,

                'status' =>
                    'scheduled',
            ]);


        // -----------------------------------------------------
        // Response
        // -----------------------------------------------------

        return response()->json([
            'message' =>
                'Invoice berhasil dijadwalkan.',

            'data' =>
                $scheduled,
        ], 201);
    }
}