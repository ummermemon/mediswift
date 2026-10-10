<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
}
