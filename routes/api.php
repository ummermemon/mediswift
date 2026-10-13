<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorAuthController;
use App\Http\Controllers\Api\SuperAdmin\SuperAdminAuthController;
use App\Http\Controllers\Api\SuperAdmin\CategoryController;
use App\Http\Controllers\Api\SuperAdmin\SubcategoryController;
use App\Http\Controllers\Api\SuperAdmin\BrandController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Doctor Routes
Route::post('/doctor/register', [DoctorAuthController::class, 'register']);

//Superadmin Routes
Route::post('/superadmin/login', [SuperAdminAuthController::class, 'login']);
Route::middleware(['auth:sanctum', 'role:superadmin'])->prefix('superadmin')->group(function () {
    // Route::post('/login', [SuperAdminAuthController::class, 'login']);

    // Category Routes
    Route::prefix('category')->group(function () {
        Route::post('/add', [CategoryController::class, 'addCategory']);
        Route::get('/list', [CategoryController::class, 'list']);
        Route::get('/show/{id}', [CategoryController::class, 'show']);
        Route::post('/update/{id}', [CategoryController::class, 'updateCategory']);
        Route::delete('/delete/{id}', [CategoryController::class, 'deleteCategory']);
    });

    // Subcategory Routes
    Route::prefix('subcategory')->group(function () {
        Route::post('/add', [SubcategoryController::class, 'add']);
        Route::get('/list', [SubcategoryController::class, 'list']);
        Route::get('/show/{id}', [SubcategoryController::class, 'show']);
        Route::post('/update/{id}', [SubcategoryController::class, 'update']);
        Route::delete('/delete/{id}', [SubcategoryController::class, 'delete']);
    });

    // Brand Routes
    Route::prefix('brand')->group(function () {
        Route::post('/add', [BrandController::class, 'add']);
        Route::get('/list', [BrandController::class, 'list']);
        Route::get('/show/{id}', [BrandController::class, 'show']);
        Route::post('/update/{id}', [BrandController::class, 'update']);
        Route::delete('/delete/{id}', [BrandController::class, 'delete']);
    });
});

