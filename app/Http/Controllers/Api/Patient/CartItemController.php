<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Patient;
use App\Models\PharmacyProduct;
use App\Models\Product;


class CartItemController extends Controller
{
    public function addItem(Request $request){
        $validator = Validator::make($request->all(), [
            'pharmacy_product_id' => 'required|exists:pharmacy_products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation Error.",
                'errors' => $validator->errors()
            ], 422);
        }
        $pharmacy_product_id = $request->pharmacy_product_id;
        $quantity = $request->quantity;

        $pharmacy_product = PharmacyProduct::find($pharmacy_product_id);
        $product_id = $pharmacy_product->product_id;
        $product = Product::find($product_id);

        if ($product->status == "inactive") {
            return response()->json([
                'status' => false,
                'message' => "Product not found."
            ], 422);
        }

        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();
        $cart = Cart::where('patient_id', $patient->id)->first();
        if(!$cart){
            $cart = new Cart();
            $cart->patient_id = $patient->id;
            $cart->save();
        }

        if($quantity > $pharmacy_product->quantity){
            return response()->json([
                'status' => false,
                'message' => "Insufficient stock."
            ], 422);
        }

        $cart_item = CartItem::where('pharmacy_product_id', $pharmacy_product_id)->first();
        if ($cart_item){
            return response()->json([
                'status' => false,
                'message' => "Item already exist in cart."
            ], 422);
        }

        $cart_item = new CartItem();
        $cart_item->pharmacy_product_id = $pharmacy_product_id;
        $cart_item->quantity = $quantity;
        $cart_item->cart_id = $cart->id;
        $cart_item->save();

        return response()->json([
            'status' => true,
            'message' => 'Item added into cart.'
        ], 201);
    }

    public function listItems(){
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();

        $cart = Cart::where('patient_id', $patient->id)->first();
        if(!$cart){
            $cart = new Cart();
            $cart->patient_id = $patient->id;
            $cart->save();
        }

        $cart_items = CartItem::where('cart_id', $cart->id)->with('pharmacy_product.product')->get();
        if ($cart_items->count() == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Items not found.',
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'Cart items found.',
            'cart_items' => $cart_items
        ], 200);

    }

    public function updateItemQty($id, Request $request){

        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Validation Error.",
                'errors' => $validator->errors()
            ], 422);
        }

        $quantity = $request->quantity;
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();

        $cart = Cart::where('patient_id', $patient->id)->first();
        if(!$cart){
            $cart = new Cart();
            $cart->patient_id = $patient->id;
            $cart->save();
        }

        $cart_item = CartItem::where([
            ['id', '=', $id],
            ['cart_id', '=', $cart->id],
        ])->first();

        

        if(!$cart_item){
            return response()->json([
                'status' => false,
                'message' => 'Cart Item not found.'
            ], 404);
        }

        $pharmacy_product = PharmacyProduct::find($cart_item->pharmacy_product_id);

        if($quantity > $pharmacy_product->quantity){
            return response()->json([
                'status' => false,
                'message' => "Insufficient stock."
            ], 422);
        }

        $cart_item->quantity = $quantity;
        $cart_item->save();

        return response()->json([
            'status' => true,
            'message' => 'Quantity updated successfully.',
            'cart_item' => $cart_item
        ], 200);

    }

    public function removeItem($id){
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();

        $cart = Cart::where('patient_id', $patient->id)->first();
        if(!$cart){
            $cart = new Cart();
            $cart->patient_id = $patient->id;
            $cart->save();
        }

        $cart_item = CartItem::where([
            ['id', '=', $id],
            ['cart_id', '=', $cart->id],
        ])->first();

        if(!$cart_item){
            return response()->json([
                'status' => false,
                'message' => 'Cart Item not found.'
            ], 404);
        }

        $cart_item->delete();
        return response()->json([
            'status' => true,
            'message' => 'Cart Item removed successfully.'
        ], 200);
    }
}
