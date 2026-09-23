<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ScheduledInvoiceEmailController;
use App\Http\Controllers\PublicInvoiceController;
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
// PUBLIC INVOICE (dipakai Browsershot buat generate PDF, TANPA login)
// Keamanan mengandalkan print_token acak, bukan session/token login.
// =========================

Route::get('/public/invoices/{invoice}', [PublicInvoiceController::class, 'show']);


// =========================
// PROTECTED ROUTES
// =========================

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('invoices', InvoiceController::class);

    Route::post('/invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail']);

    Route::get('/company-profile', [CompanyProfileController::class, 'show']);

    Route::post('/company-profile', [CompanyProfileController::class, 'update']);

    // =========================
    // KLIEN
    // =========================

    Route::apiResource('clients', ClientController::class);

    // =========================
    // PRODUK
    // =========================

    Route::apiResource('products', ProductController::class);

    // =========================
    // JADWAL KIRIM OTOMATIS
    // =========================

    Route::get('/scheduled-emails', [ScheduledInvoiceEmailController::class, 'index']);
    Route::post('/scheduled-emails', [ScheduledInvoiceEmailController::class, 'store']);
    Route::post('/scheduled-emails/{scheduledInvoiceEmail}/cancel', [ScheduledInvoiceEmailController::class, 'cancel']);
    Route::post('/scheduled-emails/{scheduledInvoiceEmail}/reactivate', [ScheduledInvoiceEmailController::class, 'reactivate']);

});
