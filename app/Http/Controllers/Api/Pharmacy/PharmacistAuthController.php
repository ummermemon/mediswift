<?php

namespace App\Http\Controllers\Api\Pharmacy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pharmacy;
use App\Models\PharmacyAddress;
use App\Models\Pharmacist;
use Illuminate\Support\Facades\Hash;

class PharmacistAuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate Request
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'pancard_no' => 'required|string|max:20',
            'pancard_file' => 'required|file|mimes:jpeg,png,jpg,pdf',
        ]);
        
        // Create User
        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'role' => 'pharmacist',
            'password' => Hash::make($validated['password']),
        ]);

        $pharmacist = Pharmacist::create([
            'user_id' => $user->id,
            'pancard_no' => $validated['pancard_no'],
            'pancard_file' => $request->file('pancard_file')->store('pancards', 'public'),
        ]);

        return response()->json([
            'message' => 'Pharmacist registered successfully.',
            'user' => $user,
            'pharmacist' => $pharmacist
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials['role'] = 'pharmacist';

        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
