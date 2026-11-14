<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories,name',
                'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
                'status' => 'required|in:active,inactive'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }
            $name = $request->name;
            $status = $request->status;

            //Upload the image 
            $imagePath = $request->file('image')->store('uploads/categories', 'public');

            // Create a new category
            $category = new Category();
            $category->name = $name;
            $category->image = $imagePath;
            $category->status = $status;
            $category->save();

            return response()->json([
                'status' => true,
                'message' => 'Category added successfully', 
                'category' => $category
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
            $categories = Category::all();

            if ($categories->count() == 0){
                return response()->json([
                    'status' => false,
                    'message' => 'Categories not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Categories found.',
                'categories' => $categories
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
            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Category not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Category found.',
                'category' => $category
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again.",
                'error' => $th
            ], 500);
        }
        
    }

    public function updateCategory(Request $request, $id)
    {
        try {
            $category = Category::find($id);
            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Category not found.'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories,name,'.$id,
                'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
                'status' => 'required|in:active,inactive'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }

            $name = $request->name;
            $status = $request->status;

            if ($request->hasFile('image')) {
                //Delete the existing image
                if ($category->image && Storage::disk('public')->exists($category->image)) {
                    Storage::disk('public')->delete($category->image);
                }
                $imagePath = $request->file('image')->store('uploads/categories', 'public');
                $category->image = $imagePath;
            }

            $category->name = $name;
            $category->status = $status;

            $category->save();

            return response()->json([
                'status' => true,
                'message' => 'Category updated successfully', 
                'category' => $category
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function deleteCategory($id)
    {
        try {
            $category = Category::find($id);
            
            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Category not found.'
                ], 404);
            }

            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return response()->json([
                'status' => true,
                'message' => 'Category deleted successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
        
    }
}
