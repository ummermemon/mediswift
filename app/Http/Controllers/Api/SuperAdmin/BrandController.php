<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'status' => 'required|in:active,inactive',
        ]);

        $imagePath = $request->file('logo')->store('brand/logos', 'public');

        $brand = Brand::create([
            'name' => $validatedData['name'],
            'logo' => $imagePath,
            'description' => $validatedData['description'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'status' => $validatedData['status'],
        ]);

        return response()->json(['message' => 'Brand added successfully', 'brand' => $brand], 201);

    }
    public function list()
    {
        $brands = Brand::all();
        return response()->json(['brands' => $brands], 200);
    }
    public function show($id)
    {
        $brand = Brand::findOrFail($id);
        return response()->json(['brand' => $brand], 200);
    }
    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('logo')) {
            $imagePath = $request->file('logo')->store('brand/logos', 'public');
            $validatedData['logo'] = $imagePath;
        }

        $brand->update($validatedData);

        return response()->json(['message' => 'Brand updated successfully', 'brand' => $brand], 200);
    }
    
    public function delete($id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully'], 200);
    }
}