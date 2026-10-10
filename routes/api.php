<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorAuthController;
use App\Http\Controllers\SuperAdminAuthController;
use App\Http\Controllers\SuperAdmin\CategoryController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Doctor Routes
Route::post('/doctor/register', [DoctorAuthController::class, 'register']);


//Superadmin Routes
Route::prefix('superadmin')->group(function () {
    Route::post('/login', [SuperAdminAuthController::class, 'login']);

    // Category Routes
    Route::post('/category/add', [CategoryController::class, 'addCategory']);
    Route::get('/category/list', [CategoryController::class, 'list']);
    Route::get('/category/show/{id}', [CategoryController::class, 'show']);
    Route::post('/category/update/{id}', [CategoryController::class, 'updateCategory']);
    Route::delete('/category/delete/{id}', [CategoryController::class, 'deleteCategory']);
});

