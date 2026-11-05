<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\EmailOtp;
use Illuminate\Support\Facades\Hash;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class PatientAuthController extends Controller
{
    public function loginOrSignup(Request $request) {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        
        $user = Auth::user();

        // Generate Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user' => $user,
            'token' => $token,
        ], 200);
    }
    public function sendOtp(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        $email = strtolower(trim($request->email));

        $otp = (string) random_int(1000, 9999);

        EmailOtp::where('email', $email)->delete();

        EmailOtp::create([
            'email' => $email,
            'otp_hash' => Hash::make($otp),
            'expires_at' => now()->addMinutes(5),
        ]);

        Mail::to($email)->send(new OtpMail($otp));

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully to your email.',
        ]);
    }
    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:4',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = strtolower(trim($request->email));

        $result = DB::transaction(function () use ($email, $request) {

            // Find OTP and lock it during verification
            $otpRecord = EmailOtp::where('email', $email)
                ->latest()
                ->lockForUpdate()
                ->first();

            if (!$otpRecord) {
                return [
                    'error' => 'OTP not found. Please request a new OTP.',
                    'status' => 404,
                ];
            }

            // Check expiration
            if ($otpRecord->expires_at->isPast()) {
                $otpRecord->delete();

                return [
                    'error' => 'OTP expired. Please request a new OTP.',
                    'status' => 422,
                ];
            }

            // Maximum 5 attempts
            if ($otpRecord->attempts >= 5) {
                $otpRecord->delete();

                return [
                    'error' => 'Maximum attempts exceeded. Please request a new OTP.',
                    'status' => 429,
                ];
            }

            // Verify OTP hash
            if (!Hash::check($request->otp, $otpRecord->otp_hash)) {

                $otpRecord->increment('attempts');

                return [
                    'error' => 'Incorrect OTP.',
                    'status' => 422,
                ];
            }

            // Find existing user
            $user = User::where('email', $email)->first();
            if ($user->role != "patient"){
                return [
                    'error' => 'Patient not found.',
                    'status' => 404,
                ];
            }

            $isNewUser = false;

            // Register new user if email doesn't exist
            if (!$user) {

                $user = User::create([
                    'email' => $email,
                    'password' => Hash::make(Str::random(40)),
                    'role' => 'patient',
                    'email_verified_at' => now(),
                ]);

                $isNewUser = true;
            } else {

                // Mark email as verified
                if (!$user->email_verified_at) {
                    $user->email_verified_at = now();
                    $user->save();
                }
            }

            // Delete OTP after successful verification
            $otpRecord->delete();

            return [
                'user' => $user,
                'is_new_user' => $isNewUser,
            ];
        });

        // Handle verification errors
        if (isset($result['error'])) {
            return response()->json([
                'success' => false,
                'message' => $result['error'],
            ], $result['status']);
        }

        // Generate Sanctum token
        $token = $result['user']->createToken('MediSwift Mobile')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully.',
            'is_new_user' => $result['is_new_user'],
            'user' => $result['user'],
            'token' => $token,
        ], 200);
    }
}
