<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    // GET /api/invoices
    public function index(Request $request)
    {
        return Invoice::with('items')->latest()->paginate(15);
    }

    // POST /api/invoices
    public function store(Request $request)
{
    $data = $request->validate([
        'template_id' => 'required|integer|min:1',
        'issue_date' => 'required|date',
        'due_date' => 'required|date|after_or_equal:issue_date',
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
        'invoice_number' => 'INV-' . strtoupper(Str::random(6)),
    ]);

    $invoice->items()->createMany($data['items']);

    return response()->json($invoice->load('items'), 201);
}

    // GET /api/invoices/{invoice}
    public function show(Invoice $invoice)
    {
        return $invoice->load('items');
    }

    // PUT /api/invoices/{invoice}
    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'template_id' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:unpaid,paid,overdue',
            'tax_percent' => 'sometimes|numeric|min:0|max:100',
            'discount_percent' => 'sometimes|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        $invoice->update($data);
        return $invoice->load('items');
    }

    // DELETE /api/invoices/{invoice}
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->noContent();
    }
}