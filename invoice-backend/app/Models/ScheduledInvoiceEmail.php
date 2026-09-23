<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledInvoiceEmail extends Model
{
    protected $fillable = [
        'invoice_id',
        'user_id',
        'recipient_email',
        'frequency',
        'next_send_at',
        'last_sent_at',
        'send_count',
        'status',
        'last_error',
    ];

    protected $casts = [
        'next_send_at' => 'datetime',
        'last_sent_at' => 'datetime',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
