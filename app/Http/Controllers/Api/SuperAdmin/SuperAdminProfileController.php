<?php

namespace App\Http\Controllers\Api\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;



class SuperAdminProfileController extends Controller
{
    public function changePassword(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'old_password' => 'required|min:5|max:255',
                'password' => 'required|min:5|max:255|confirmed',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }
            $old_password = $request->old_password;
            $password = $request->password;

            $user = Auth::user();
            if (!$user || $user->role !== 'superadmin') {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access.'
                ], 401);
            }

            if (!Hash::check($old_password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Old password is incorrect.'
                ], 422);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Password changed successfully.'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again."
            ], 500);
        }
    }

    public function editProfile(Request $request) {
        try {

            $user = Auth::user();
            
            $validator = Validator::make($request->all(), [
                'profile_img' => 'nullable|image|mimes:jpeg,png,jpg|max:20480',
                'first_name' => 'required|min:5|max:255',
                'last_name' => 'required|min:5|max:255',
                'phone' => [
                    'required',
                    'integer',
                    'digits:10',
                    Rule::unique('users', 'phone')->ignore($user->id),
                ],
                'email' => [
                    'required',
                    'email',
                    'max:255',
                    Rule::unique('users', 'email')->ignore($user->id),
                ],
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => "Validation Error.",
                    'errors' => $validator->errors()
                ], 422);
            }

            
            $first_name = $request->first_name;
            $last_name = $request->last_name;
            $email = $request->email;
            $phone = $request->phone;

            if (!$user || $user->role !== 'superadmin') {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access.'
                ], 401);
            }


            if ($request->hasFile('profile_img')) {
                if ($user->profile_img && Storage::disk('public')->exists($user->profile_img)) {
                    Storage::disk('public')->delete($user->profile_img);
                }
                $imagePath = $request->file('profile_img')->store('uploads/users', 'public');
                $user->profile_img = $imagePath;
            }

            $user->first_name = $first_name;
            $user->last_name = $last_name;
            $user->email = $email;
            $user->phone = $phone;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully.',
                'user' => $user
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again.",
                'error' => $th
            ], 500);
        }
    }

    public function getProfile(){
        try {
            $user = Auth::user();
            if (!$user || $user->role !== 'superadmin') {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access.'
                ], 401);
            }
                
            return response()->json([
                'status' => true,
                'message' => 'Superadmin profile found.',
                'user' => $user
            ], 200);
            
        }catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong. Please try again.",
                'error' => $th
            ], 500);
        }
    }
}
