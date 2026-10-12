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

        // Create a new subcategory
        $subcategory = Subcategory::create($validatedData);

        return response()->json([
            'message' => 'Subcategory created successfully',
            'data' => $subcategory,
        ], 201);
    }

    public function list(Request $request)
    {
        // Fetch all subcategories
        $subcategories = Subcategory::all();

        return response()->json([
            'data' => $subcategories,
        ], 200);
    }
}
