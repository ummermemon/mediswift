<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientAddress;

class AddressController extends Controller
{
    public function addAddress(Request $request)
    {
        $validatedData = $request->validate([
            'address_type' => 'required',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:20',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);
        $user_id = auth()->user()->id;
        
        $pharmacy_address = new PatientAddress();
        $pharmacy_address->patient_id = auth()->user()->id;
        $pharmacy_address->address_type = $validatedData['address_type'];
        $pharmacy_address->address_line_1 = $validatedData['address_line_1'];
        $pharmacy_address->address_line_2 = $validatedData['address_line_2'];
        $pharmacy_address->city = $validatedData['city'];
        $pharmacy_address->state = $validatedData['state'];
        $pharmacy_address->pincode = $validatedData['pincode'];
        $pharmacy_address->latitude = $validatedData['latitude'];
        $pharmacy_address->longitude = $validatedData['longitude'];
        $pharmacy_address->save();

        return response()->json([
            'message' => 'Pharmacy Address Added',
            'pharmacy_address' => $pharmacy_address,
        ], 201);




        
    }

    public function listAddress()
    {
        $user_id = auth()->user()->id;
        dd($user_id);
    }
}
