<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyProfile extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'logo_path',
        'address',
        'email',
        'phone',
        'website',
        'npwp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}