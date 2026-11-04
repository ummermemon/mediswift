<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Events\Verified;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'app_redirect_url' => 'required|string',
        ]);

        // Validate Expo Go redirect scheme
        $redirectUrl = $validated['app_redirect_url'];

        if (parse_url($redirectUrl, PHP_URL_SCHEME) !== 'exp') {
            return response()->json([
                'message' => 'Invalid application redirect URL.'
            ], 422);
        }

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'role' => 'patient',
            'password' => Hash::make($validated['password']),
        ]);

        // Send custom verification email
        Notification::send(
            $user,
            new CustomVerifyEmail($redirectUrl)
        );

        // Create API token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully. Please verify your email.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        if (!hash_equals(
            sha1($user->getEmailForVerification()),
            $hash
        )) {
            return response()->json([
                'message' => 'Invalid verification link.'
            ], 400);
        }

        if (!$user->hasVerifiedEmail()) {
            if ($user->markEmailAsVerified()) {
                event(new Verified($user));
            }
        }

        $redirectUrl = $request->query('redirect');

        if (!$redirectUrl || !str_starts_with($redirectUrl, 'exp://')) {
            return response()->json([
                'message' => 'Email verified successfully.'
            ]);
        }

        return redirect()->away($redirectUrl);
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
