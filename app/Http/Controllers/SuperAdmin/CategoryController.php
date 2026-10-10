<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;

class CategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        //Upload the image 
        $imagePath = $request->file('image')->store('categories', 'public');

        // Create a new category
        $category = new Category();
        $category->name = $validatedData['name'];
        $category->image = $imagePath;
        $category->save();

        return response()->json(['message' => 'Category added successfully', 'category' => $category], 201);
    }
    public function list()
    {
        $categories = Category::all();
        return response()->json(['categories' => $categories], 200);
    }
    
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['category' => $category], 200);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if (isset($validatedData['name'])) {
            $category->name = $validatedData['name'];
        }

        if ($request->hasFile('image')) {
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }

            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image = $imagePath;
        }

        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'category' => $category], 200);
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
