<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class PublicInvoiceController extends Controller
{
    // GET /api/public/invoices/{invoice}?token=xxx
    // TIDAK dilindungi middleware auth:sanctum -- ini sengaja, karena
    // yang mengakses adalah Browsershot (headless browser) di server,
    // bukan user yang login. Keamanannya mengandalkan print_token acak
    // yang cuma diketahui backend, bukan hasil tebakan ID biasa.
    public function show(Request $request, Invoice $invoice)
    {
        $token = $request->query('token');

        if (!$token || !$invoice->print_token || $token !== $invoice->print_token) {
            return response()->json([
                'message' => 'Token tidak valid.'
            ], 403);
        }

        return $invoice->load('items');
    }
}
