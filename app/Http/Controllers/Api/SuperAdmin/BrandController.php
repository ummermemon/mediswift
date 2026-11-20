<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    public function add(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'logo' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
                'description' => 'nullable|string',
                'website' => 'nullable|url',
                'status' => 'required|in:active,inactive',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }
            $name = $request->name;
            $description = $request->description;
            $website = $request->website;
            $status = $request->status;

            //Upload the logo 
            $logoPath = $request->file('logo')->store('uploads/brands', 'public');

            // Create a new category
            $brand = new Brand();
            $brand->name = $name;
            $brand->logo = $logoPath;
            $brand->description = $description;
            $brand->website = $website;
            $brand->status = $status;
            $brand->save();

            return response()->json([
                'status' => true,
                'message' => 'Brand added successfully', 
                'brand' => $brand
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function list()
    {
        try {
            $brands = Brand::all();

            if ($brands->count() == 0){
                return response()->json([
                    'status' => false,
                    'message' => 'Brands not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Brands found.',
                'brands' => $brands
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $brand = Brand::find($id);

            if (!$brand) {
                return response()->json([
                    'status' => false,
                    'message' => 'Brand not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Brand found.',
                'brand' => $brand
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again.",
                'error' => $th
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $brand = Brand::find($id);
            if (!$brand) {
                return response()->json([
                    'status' => false,
                    'message' => 'Brand not found.'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
                'description' => 'nullable|string',
                'website' => 'nullable|url',
                'status' => 'required|in:active,inactive',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }

            $name = $request->name;
            $description = $request->description;
            $website = $request->website;
            $status = $request->status;

            if ($request->hasFile('logo')) {
                //Delete the existing image
                if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
                    Storage::disk('public')->delete($brand->logo);
                }
                $imagePath = $request->file('logo')->store('uploads/brands', 'public');
                $brand->logo = $imagePath;
            }

            $brand->name = $name;
            $brand->status = $status;
            $brand->description = $description;
            $brand->website = $website;
            $brand->save();

            return response()->json([
                'status' => true,
                'message' => 'Brand updated successfully', 
                'brand' => $brand
            ], 200);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }
    
    public function delete($id)
    {
        try {
            $brand = Brand::find($id);
            
            if (!$brand) {
                return response()->json([
                    'status' => false,
                    'message' => 'Brand not found.'
                ], 404);
            }

            if ($brand->logo) {
                Storage::disk('public')->delete($brand->logo);
            }

            $brand->delete();

            return response()->json([
                'status' => true,
                'message' => 'Brand deleted successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
        
    }
}