<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Google OAuth Routes
Route::get('/auth/google', function () {
    return Socialite::driver('google')->stateless()->redirect();
});

Route::get('/auth/google/callback', function () {
    try {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Cari berdasarkan email, jika tidak ada maka buat user baru
        $user = User::updateOrCreate([
            'email' => $googleUser->getEmail(),
        ], [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
            'password' => bcrypt(str()->random(16)), // password acak
        ]);

        // Generate token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Redirect kembali ke SvelteKit membawa token
        return redirect("http://localhost:5173/auth/callback?token={$token}&user=" . urlencode(json_encode($user)));
    } catch (\Exception $e) {
        return response()->json(['error' => 'Gagal login Google: ' . $e->getMessage()], 500);
    }
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('invoices', InvoiceController::class);
});