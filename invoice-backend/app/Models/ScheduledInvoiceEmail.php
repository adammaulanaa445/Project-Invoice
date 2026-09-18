<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledInvoiceEmail extends Model
{
    protected $fillable = [
        'invoice_id',
        'user_id',
        'recipient_email',
        'scheduled_at',
        'pdf_path',
        'status',
        'error_message',
        'sent_at',
    ];


    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];


    public function invoice()
    {
        return $this->belongsTo(
            Invoice::class
        );
    }


    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}