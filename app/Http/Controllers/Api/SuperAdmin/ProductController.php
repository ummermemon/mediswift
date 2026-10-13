<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function add(Request $request){
        $validatedData = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requires_prescription' => 'required|boolean',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'required|in:active,inactive',
        ]);
        // Handle image uploads
        if ($request->hasFile('image_1')) {
            $validatedData['image_1'] = $request->file('image_1')->store('products', 'public');
        }
        if ($request->hasFile('image_2')) {
            $validatedData['image_2'] = $request->file('image_2')->store('products', 'public');
        }
        if ($request->hasFile('image_3')) { 
            $validatedData['image_3'] = $request->file('image_3')->store('products', 'public');
        }
        if ($request->hasFile('image_4')) {
            $validatedData['image_4'] = $request->file('image_4')->store('products', 'public');
        }

        $product = Product::create($validatedData);
        return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
    }

    public function list(){
        $products = Product::all();
        return response()->json(['products' => $products]);
    }
    public function show($id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json(['product' => $product]);
    }
    public function update(Request $request, $id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requires_prescription' => 'required|boolean',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        // Handle image uploads
        if ($request->hasFile('image_1')) {
            $validatedData['image_1'] = $request->file('image_1')->store('products', 'public');
        }
        if ($request->hasFile('image_2')) {
            $validatedData['image_2'] = $request->file('image_2')->store('products', 'public');
        }
        if ($request->hasFile('image_3')) { 
            $validatedData['image_3'] = $request->file('image_3')->store('products', 'public');
        }
        if ($request->hasFile('image_4')) {
            $validatedData['image_4'] = $request->file('image_4')->store('products', 'public');
        }

        $product->update($validatedData);
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }
    public function delete($id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
