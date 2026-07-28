<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorAuthController;
use App\Http\Controllers\SuperAdminAuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Doctor Routes
Route::post('/doctor/register', [DoctorAuthController::class, 'register']);


//Superadmin Routes
Route::post('/superadmin/login', [SuperAdminAuthController::class, 'login']);


