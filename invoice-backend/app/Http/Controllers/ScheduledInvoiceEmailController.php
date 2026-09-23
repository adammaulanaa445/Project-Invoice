<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\ScheduledInvoiceEmail;
use Illuminate\Http\Request;

class ScheduledInvoiceEmailController extends Controller
{
    // GET /api/scheduled-emails
    // Daftar semua jadwal milik user yang sedang login, beserta info invoice-nya
    public function index(Request $request)
    {
        return ScheduledInvoiceEmail::with('invoice:id,invoice_number,to_name')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

    // POST /api/scheduled-emails
    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'recipient_email' => 'required|email',
            'frequency' => 'required|in:once,hourly,daily,weekly,monthly',
            'next_send_at' => 'required|date',
        ]);

        $invoice = Invoice::find($data['invoice_id']);

        if ($invoice->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke invoice ini.'
            ], 403);
        }

        $schedule = ScheduledInvoiceEmail::create([
            ...$data,
            'user_id' => $request->user()->id,
            'status' => 'active',
        ]);

        return response()->json($schedule->load('invoice:id,invoice_number,to_name'), 201);
    }

    // POST /api/scheduled-emails/{scheduledInvoiceEmail}/cancel
    // Dipakai admin untuk membatalkan jadwal yang masih berjalan.
    // Data TIDAK dihapus, hanya diubah statusnya (supaya ada histori).
    public function cancel(Request $request, ScheduledInvoiceEmail $scheduledInvoiceEmail)
    {
        if ($scheduledInvoiceEmail->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke jadwal ini.'
            ], 403);
        }

        $scheduledInvoiceEmail->update(['status' => 'cancelled']);

        return $scheduledInvoiceEmail;
    }

    // POST /api/scheduled-emails/{scheduledInvoiceEmail}/reactivate
    // Kalau jadwal gagal terkirim (status 'failed'), admin bisa aktifkan lagi
    // dengan waktu kirim baru.
    public function reactivate(Request $request, ScheduledInvoiceEmail $scheduledInvoiceEmail)
    {
        if ($scheduledInvoiceEmail->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke jadwal ini.'
            ], 403);
        }

        $data = $request->validate([
            'next_send_at' => 'required|date',
        ]);

        $scheduledInvoiceEmail->update([
            'status' => 'active',
            'next_send_at' => $data['next_send_at'],
            'last_error' => null,
        ]);

        return $scheduledInvoiceEmail;
    }
}
