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
        try {
            $subcategories = Subcategory::all();

            if ($subcategories->count() == 0){
                return response()->json([
                    'status' => false,
                    'message' => 'Subcategories not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Subcategories found.',
                'subcategories' => $subcategories
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
            $subcategory = Subcategory::find($id);

            if (!$subcategory) {
                return response()->json([
                    'status' => false,
                    'message' => 'Subcategory not found.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Subcategory found.',
                'subcategory' => $subcategory
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
            $subcategory = Subcategory::find($id);
            if (!$subcategory) {
                return response()->json([
                    'status' => false,
                    'message' => 'Subcategory not found.'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:subcategories,subcategory,'.$id,
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

            $name = $request->name;
            $category_id = $request->category_id;
            $status = $request->status;

            $subcategory->subcategory = $name;
            $subcategory->category_id = $category_id;
            $subcategory->status = $status;

            $subcategory->save();

            return response()->json([
                'status' => true,
                'message' => 'Subcategory updated successfully', 
                'subcategory' => $subcategory
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            $subcategory = Subcategory::find($id);
            
            if (!$subcategory) {
                return response()->json([
                    'status' => false,
                    'message' => 'Subcategory not found.'
                ], 404);
            }

            $subcategory->delete();

            return response()->json([
                'status' => true,
                'message' => 'Subcategory deleted successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }
}
