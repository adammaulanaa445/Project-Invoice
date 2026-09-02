<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // =========================
    // REGISTER
    // =========================

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 201);
    }


    // =========================
    // LOGIN MANUAL
    // =========================

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }


    // =========================
    // GOOGLE - REDIRECT
    // =========================

    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->stateless()
            ->with([
                'prompt' => 'select_account'
            ])
            ->redirect();
    }


    // =========================
    // GOOGLE - CALLBACK
    // =========================

    public function handleGoogleCallback()
    {
        try {

            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();


            // Cari user berdasarkan email
            $user = User::where(
                'email',
                $googleUser->getEmail()
            )->first();


            // Kalau belum ada → buat user baru
            if (!$user) {

                $user = User::create([
                    'name' => $googleUser->getName() ?: 'Google User',
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(32)),
                ]);

            } else {

                // Kalau user sudah ada → update google_id
                $user->update([
                    'google_id' => $googleUser->getId(),
                ]);

            }


            // Buat token Sanctum
            $token = $user
                ->createToken('auth_token')
                ->plainTextToken;


            // Kirim user + token ke Svelte
            $query = http_build_query([
                'token' => $token,
                'user' => json_encode([
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]),
            ]);


            return redirect(
                "http://localhost:5173/auth/callback?$query"
            );

        } catch (\Exception $e) {

            return redirect(
                'http://localhost:5173/login?error=' .
                urlencode($e->getMessage())
            );

        }
    }


    // =========================
    // LOGOUT
    // =========================

    public function logout(Request $request)
    {
        $request->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }
}