<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacist extends Model
{
    protected $fillable = [
        'user_id',
        'pancard_no',
        'pancard_file',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
