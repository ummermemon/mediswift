<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subcategory;

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
        $subcategories = Subcategory::with('category:id,name')->get();

        return response()->json([
            'data' => $subcategories,
        ], 200);
    }
}
