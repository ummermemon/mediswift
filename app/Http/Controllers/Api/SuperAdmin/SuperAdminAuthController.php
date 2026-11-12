<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class SuperAdminAuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }
            $email = $request->email;
            $password = $request->password;

            $user = User::where('email', $email)->where('role', 'superadmin')->first();

            if (!$user || !Hash::check($password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => "Invalid email or password."
                ], 401);
            }

            $token = $user->createToken('superadmin_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Superadmin logged in successfully.',
                'user' => $user,
                'token' => $token,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }
}
