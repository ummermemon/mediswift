<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate Request
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        // Create User
        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'role' => 'patient',
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));

        // Create API Token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return Response
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function verifyEmail(Request $request, $id, $hash)
{
    $user = User::find($id);

    if (!$user || !hash_equals(
        sha1($user->getEmailForVerification()),
        $hash
    )) {
        return response()->json([
            'message' => 'Invalid verification link.'
        ], 400);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json([
            'message' => 'Email already verified.'
        ]);
    }

    if ($user->markEmailAsVerified()) {
        return response()->json([
            'message' => 'Email verified successfully.'
        ]);
    }

    return response()->json([
        'message' => 'Email verification failed.'
    ], 400);
}
    public function login(Request $request) {
        // Validate Request
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Check Credentials
        if (!Auth::attempt($validated)) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        // Get Authenticated User
        $user = Auth::user();

        // Generate Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user' => $user,
            'token' => $token,
        ], 200);
    }
}
