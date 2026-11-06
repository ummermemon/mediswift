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
use App\Models\Patient;
use App\Models\RegistrationToken;
use Illuminate\Support\Str;


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

            $otpRecord = EmailOtp::where('email', $email)
                ->lockForUpdate()
                ->first();

            if (!$otpRecord) {
                return [
                    'error' => 'OTP not found. Please request a new OTP.',
                    'status' => 404,
                ];
            }

            if ($otpRecord->expires_at->isPast()) {
                $otpRecord->delete();

                return [
                    'error' => 'OTP expired. Please request a new OTP.',
                    'status' => 422,
                ];
            }

            if ($otpRecord->attempts >= 5) {
                $otpRecord->delete();

                return [
                    'error' => 'Maximum attempts exceeded. Please request a new OTP.',
                    'status' => 429,
                ];
            }

            if (!Hash::check($request->otp, $otpRecord->otp_hash)) {
                $otpRecord->increment('attempts');

                return [
                    'error' => 'Incorrect OTP.',
                    'status' => 422,
                ];
            }

            // Find existing user
            $user = User::where('email', $email)->first();

            // New user: Generate registration token
            if (!$user) {
                $registrationToken = Str::random(64);

                RegistrationToken::where('email', $email)->delete();

                
                RegistrationToken::create([
                    'email' => $email,
                    'token_hash' => Hash::make($registrationToken),
                    'expires_at' => now()->addMinutes(10),
                ]);

                // Delete verified OTP
                $otpRecord->delete();

                return [
                    'is_new_user' => true,
                    'registration_token' => $registrationToken,
                ];
            }

            

            // Existing user: Check role
            if ($user->role !== 'patient') {
                return [
                    'error' => 'Patient not found.',
                    'status' => 404,
                ];
            }

            // Verify the patient is active or inactive (Need to write the code)
            $patient = Patient::where('user_id', $user->id)->first();
            if($patient->status == "inactive"){
                return [
                    'error' => 'Account is temporary restricted.',
                    'status' => 404,
                ];
            }

            // Mark email as verified
            if (!$user->email_verified_at) {
                $user->email_verified_at = now();
                $user->save();
            }

            // Delete OTP
            $otpRecord->delete();

            return [
                'is_new_user' => false,
                'user' => $user,
            ];
        });

        // Handle errors
        if (isset($result['error'])) {
            return response()->json([
                'success' => false,
                'message' => $result['error'],
            ], $result['status']);
        }

        // New user response
        if ($result['is_new_user']) {
            return response()->json([
                'success' => true,
                'is_new_user' => true,
                'registration_token' => $result['registration_token'],
                'message' => 'Email verified. Complete your registration.',
            ], 200);
        }

        // Existing user: Generate Sanctum token
        $token = $result['user']
            ->createToken('MediSwift Mobile')
            ->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully.',
            'is_new_user' => false,
            'user' => $result['user'],
            'token' => $token,
        ], 200);
    }

    public function register(Request $request)
    {
        // Validate registration data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'registration_token' => 'required|string',

            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',

            'phone' => 'required|string|max:20',
            'dob' => 'required|date|before:today',

            'blood_group' => 'nullable|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = strtolower(trim($request->email));

        $result = DB::transaction(function () use ($request, $email) {

            // Find and lock registration token
            $registration = RegistrationToken::where('email', $email)
                ->lockForUpdate()
                ->first();

            if (!$registration) {
                return [
                    'error' => 'Registration token not found. Please verify your email again.',
                    'status' => 401,
                ];
            }

            // Check token expiration
            if ($registration->expires_at->isPast()) {
                $registration->delete();

                return [
                    'error' => 'Registration token expired. Please verify your email again.',
                    'status' => 401,
                ];
            }

            // Verify registration token
            if (!Hash::check($request->registration_token, $registration->token_hash)) {
                return [
                    'error' => 'Invalid registration token.',
                    'status' => 401,
                ];
            }

            // Check if email already exists
            if (User::where('email', $email)->exists()) {
                $registration->delete();

                return [
                    'error' => 'An account with this email already exists.',
                    'status' => 409,
                ];
            }

            // Create user
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role' => 'patient',
                'email_verified_at' => now(),
            ]);

            // Create patient profile
            $patient = Patient::create([
                'user_id' => $user->id,
                'dob' => $request->dob,
                'blood_group' => $request->blood_group,
                'status' => 'active',
            ]);

            // Delete registration token after successful registration
            $registration->delete();

            return [
                'user' => $user,
                'patient' => $patient,
            ];
        });

        // Handle errors
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
            'message' => 'Registration completed successfully.',
            'user' => $result['user'],
            'patient' => $result['patient'],
            'token' => $token,
        ], 201);
    }

}
