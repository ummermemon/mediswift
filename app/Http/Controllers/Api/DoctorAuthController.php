<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\DoctorProfile;


class DoctorAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name'       => 'required|string|max:255',
            'last_name'        => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email',
            'password'         => 'required|min:8',

            'specialization'   => 'required|string|max:255',
            'qualification'    => 'required|string|max:255',
            'license_number'   => 'required|string|unique:doctor_profiles,license_number',
        ]);

        DB::beginTransaction();

        try {

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
                'role'       => 'doctor',
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
            ]);

            DoctorProfile::create([
                'user_id'         => $user->id,
                'specialization'  => $request->specialization,
                'qualification'   => $request->qualification,
                'license_number'  => $request->license_number,
                'is_verified'     => false,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful. Your account is pending approval from the Super Admin.'
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
