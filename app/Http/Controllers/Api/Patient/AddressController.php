<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientAddress;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function addAddress(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'address_type' => 'required|in:Work,Home,Other',
                'address_line_1' => 'required|string|max:255',
                'address_line_2' => 'nullable|string|max:255',
                'city' => 'required|string|max:100',
                'state' => 'required|string|max:100',
                'pincode' => 'required|integer|digits:6',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric'
            ]);

            $user = Auth::user();
            $patient = Patient::where('user_id', $user->id)->first();
            
            $pharmacy_address = new PatientAddress();
            $pharmacy_address->patient_id = $patient->id;
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
                'status' => true,
                'message' => 'Pharmacy Address Added.',
                'pharmacy_address' => $pharmacy_address,
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function listAddress()
    {
        try {
            $user = Auth::user();
            $patient = Patient::where('user_id', $user->id)->first();

            $addresses = PatientAddress::where('patient_id', $patient->id)->get();

            return response()->json([
                'status' => true,
                'message' => "All Addresses Fetched.",
                'addresses' => $addresses
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function getAddress($id)
    {
        try {
            $user = Auth::user();
            $patient = Patient::where('user_id', $user->id)->first();

            $address = PatientAddress::where('id', $id)->where('patient_id', $patient->id)->first();

            if (!$address){
                return response()->json([
                    'status' => false,
                    'message' => "Address not found."
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => "Address fetched.",
                'address' => $address
            ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function deleteAddress($id)
    {
        $address = PatientAddress::find($id);
        if (!$address) {
            return response()->json([
                'status' => false,
                'message' => "Address not found."
            ], 404);
        }
        // dd("User ID: ".Auth::user()->id);
        return response()->json([
            'status' => true,
            'message' => "Address",
            'address' => $address
        ], 200);
    }
}
