<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Storage;

class SubcategoryController extends Controller
{
    public function add(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'subcategory' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        // Handle image upload
        $imagePath = $request->file('image')->store('subcategories', 'public');


        // Create a new subcategory
        $subcategory = new Subcategory();
        $subcategory->subcategory = $validatedData['subcategory'];
        $subcategory->image = $imagePath;
        $subcategory->category_id = $validatedData['category_id'];  
        $subcategory->save();

        return response()->json([
            'message' => 'Subcategory created successfully',
            'data' => $subcategory,
        ], 201);
    }

    public function list(Request $request)
    {
        // Fetch all subcategories
        $subcategories = Subcategory::with('category')->get();

        return response()->json([
            'data' => $subcategories,
        ], 200);
    }

    public function show($id)
    {
        $subcategory = Subcategory::with('category')->findOrFail($id);
        return response()->json(['subcategory' => $subcategory], 200);
    }

    public function update(Request $request, $id)
    {
        $subcategory = Subcategory::findOrFail($id);

        $validatedData = $request->validate([
            'subcategory' => 'sometimes|required|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'sometimes|required|integer|exists:categories,id',
        ]);

        if (isset($validatedData['subcategory'])) {
            $subcategory->subcategory = $validatedData['subcategory'];
        }

        if (isset($validatedData['category_id'])) {
            $subcategory->category_id = $validatedData['category_id'];
        }

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
                Storage::disk('public')->delete($subcategory->image);
            }
            // Store the new image
            $imagePath = $request->file('image')->store('subcategories', 'public');
            $subcategory->image = $imagePath;
        }

        $subcategory->save();

        return response()->json([
            'message' => 'Subcategory updated successfully',
            'data' => $subcategory,
        ], 200);
    }

    public function delete($id)
    {
        $subcategory = Subcategory::findOrFail($id);

        // Delete the image if it exists
        if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
            Storage::disk('public')->delete($subcategory->image);
        }

        $subcategory->delete();

        return response()->json([
            'message' => 'Subcategory deleted successfully',
        ], 200);
    }
}
