<?php

use App\Http\Controllers\SuperAdmin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('superadmin')->name('superadmin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', function () {
        return 'superadmin Users';
    })->name('users');
});
