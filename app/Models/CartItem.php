<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacyProduct;

class CartItem extends Model
{
    public function pharmacy_product(){
        return $this->belongsTo(PharmacyProduct::class);
    }
}
