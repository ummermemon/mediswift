<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;


class SubcategoryController extends Controller
{
    public function add(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'subcategory' => 'required|string|max:255|unique:subcategories,subcategory',
                'category_id' => 'required|integer|exists:categories,id',
                'status' => 'required|in:active,inactive'
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }
            $subcategory_name = $request->subcategory;
            $category_id = $request->category_id;
            $status = $request->status;

            $category = Category::where('status', 'active')->find($category_id);

            if(!$category){
                return response()->json([
                    'status' => false,
                    'message' => "Category not found."
                ], 404);
            }

            $subcategory = new Subcategory();
            $subcategory->subcategory = $subcategory_name;
            $subcategory->category_id = $category_id;
            $subcategory->status = $status;
            $subcategory->save();
            
            return response()->json([
                'status' => true,
                'message' => 'Subcategory created successfully',
                'data' => $subcategory,
            ], 201);

        } catch (\Throwable $th) {
            
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
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
