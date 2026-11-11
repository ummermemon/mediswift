<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientAddress;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
            
            $address = new PatientAddress();
            $address->patient_id = $patient->id;
            $address->address_type = $validatedData['address_type'];
            $address->address_line_1 = $validatedData['address_line_1'];
            $address->address_line_2 = $validatedData['address_line_2'];
            $address->city = $validatedData['city'];
            $address->state = $validatedData['state'];
            $address->pincode = $validatedData['pincode'];
            $address->latitude = $validatedData['latitude'];
            $address->longitude = $validatedData['longitude'];
            $address->save();

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

    public function updateAddress(Request $request, $id)
    {
        
        try {
            $validator = Validator::make($request->all(), [
                'address_type' => 'required|in:Work,Home,Other',
                'address_line_1' => 'required|string|max:255',
                'address_line_2' => 'nullable|string|max:255',
                'city' => 'required|string|max:100',
                'state' => 'required|string|max:100',
                'pincode' => 'required|integer|digits:6',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = Auth::user();
            $patient = Patient::where('user_id', $user->id)->first();

            $address = PatientAddress::where('id', $id)->where('patient_id', $patient->id)->first();
            
            if (!$address){
                return response()->json([
                    'status' => false,
                    'message' => "Address not found."
                ], 404);
            }

            $address->address_type = $request->address_type;
            $address->address_line_1 = $request->address_line_1;
            $address->address_line_2 = $request->address_line_2;
            $address->city = $request->city;
            $address->state = $request->state;
            $address->pincode = $request->pincode;
            $address->latitude = $request->latitude;
            $address->longitude = $request->longitude;
            $address->save();

            return response()->json([
                'status' => true,
                'message' => "Address updated successfully.",
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
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();
        
        $address = PatientAddress::where([
            ['id', '=', $id],
            ['patient_id', '=', $patient->id],
        ])->first();

        if (!$address) {
            return response()->json([
                'status' => false,
                'message' => "Address not found."
            ], 404);
        }

        $address->delete();

        return response()->json([
            'status' => true,
            'message' => "Address Deleted Successfully."
        ], 200);
    }
}
