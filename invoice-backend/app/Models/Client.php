<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    // Kolom yang boleh diisi lewat mass-assignment (create/update dari Controller)
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'email',
        'phone',
    ];

    // Relasi: setiap klien milik satu user (pemilik akun)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
