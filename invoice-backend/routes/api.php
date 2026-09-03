<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyProfileController;

// =========================
// PUBLIC ROUTES
// =========================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// =========================
// GOOGLE OAUTH
// =========================

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);


// =========================
// PROTECTED ROUTES
// =========================

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('invoices', InvoiceController::class);

    Route::post('/invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail']);

    Route::get('/company-profile', [CompanyProfileController::class, 'show']);

    Route::post('/company-profile', [CompanyProfileController::class, 'update']);

});