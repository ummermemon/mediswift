<?php

namespace App\Http\Controllers\Api\Pharmacy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pharmacy;
use App\Models\PharmacyAddress;
use App\Models\Pharmacist;

class PharmacyController extends Controller
{
    public function registerPharmacy(Request $request)
    {
        // Validate Request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'drug_license_number' => 'required|string|max:100|unique:pharmacies,drug_license_number',
            'drug_license_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'gst_number' => 'required|string|max:100|unique:pharmacies,gst_number',
            'gst_certificate_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:20',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $user_id = auth()->user()->id;
        $pharmacist = Pharmacist::where('user_id', $user_id)->first();
        $pharmacist_id = $pharmacist->id;

        // Create Pharmacy
        $pharmacy = new Pharmacy();
        $pharmacy->name = $validated['name'];
        $pharmacy->logo = $request->file('logo')->store('pharmacy_logos', 'public');
        $pharmacy->drug_license_number = $validated['drug_license_number'];
        $pharmacy->drug_license_file = $request->file('drug_license_file')->store('drug_licenses', 'public');
        $pharmacy->gst_number = $validated['gst_number'];
        $pharmacy->gst_certificate_file = $request->file('gst_certificate_file')->store('gst_certificates', 'public');
        $pharmacy->pharmacist_id = $pharmacist_id;
        $pharmacy->address_line_1 = $validated['address_line_1'];
        $pharmacy->address_line_2 = $validated['address_line_2'];
        $pharmacy->city = $validated['city'];
        $pharmacy->state = $validated['state'];
        $pharmacy->pincode = $validated['pincode'];
        $pharmacy->latitude = $validated['latitude'];
        $pharmacy->longitude = $validated['longitude'];
        $pharmacy->is_online = false;
        $pharmacy->approval_status = 'pending';
        $pharmacy->status = 'active';
        $pharmacy->save();

        return response()->json([
            'message' => 'Pharmacy registered successfully.',
            'pharmacy' => $pharmacy
        ], 201);
    }

    public function addProduct(Request $request)
    {
        // Validate Request
        $validated = $request->validate([
            'pharmacy_id' => 'required|exists:pharmacies,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $pharmacy = Pharmacy::find($validated['pharmacy_id']);
        if (!$pharmacy) {
            return response()->json(['message' => 'Pharmacy not found.'], 404);
        }

        $pharmacyproduct = new PharmacyProduct();
        $pharmacyproduct->pharmacy_id = $validated['pharmacy_id'];
        $pharmacyproduct->product_id = $validated['product_id'];
        $pharmacyproduct->quantity = $validated['quantity'];
        $pharmacyproduct->price = $validated['price'];
        $pharmacyproduct->save();

        return response()->json([
            'message' => 'Product added to pharmacy inventory successfully.',
        ], 201);
    }

    // public function updateStatus(Request $request, $pharmacy_id)
    // {
    //     // Validate Request
    //     $validated = $request->validate([
    //         'is_active' => 'required|boolean',
    //     ]);

    //     $pharmacy = Pharmacy::find($pharmacy_id);
    //     if (!$pharmacy) {
    //         return response()->json(['message' => 'Pharmacy not found.'], 404);
    //     }

    //     $pharmacy->is_active = $validated['is_active'];
    //     $pharmacy->save();

    //     return response()->json([
    //         'message' => 'Pharmacy status updated successfully.',
    //         'pharmacy' => $pharmacy
    //     ], 200);
    // }
    
}
