<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'invoice_number', 'template_id', 'issue_date', 'due_date', 'currency',
        'from_name', 'from_address', 'from_email', 'from_phone', 'logo_url',
        'to_name', 'to_address', 'to_email',
        'tax_percent', 'discount_percent', 'notes', 'status', 'payment_link',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'tax_percent' => 'decimal:2',
        'discount_percent' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    // Dipakai frontend agar perhitungan subtotal/tax/total konsisten dgn komponen Svelte
    public function getSubtotalAttribute(): float
    {
        return $this->items->sum(fn ($i) => $i->qty * $i->price);
    }

    public function getDiscountAttribute(): float
    {
        return $this->subtotal * ($this->discount_percent / 100);
    }

    public function getTaxAttribute(): float
    {
        return ($this->subtotal - $this->discount) * ($this->tax_percent / 100);
    }

    public function getTotalAttribute(): float
    {
        return $this->subtotal - $this->discount + $this->tax;
    }
}