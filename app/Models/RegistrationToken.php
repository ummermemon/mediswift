<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationToken extends Model
{
    protected $fillable = [
        'email',
        'token_hash',
        'expires_at'
    ];
    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
        ];
    }
}
