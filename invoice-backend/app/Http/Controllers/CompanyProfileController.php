<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyProfileController extends Controller
{
    /**
     * Mengambil profile perusahaan user yang sedang login.
     */
    public function show(Request $request)
    {
        $profile = CompanyProfile::firstOrCreate(
            [
                'user_id' => $request->user()->id,
            ],
            [
                'company_name' => '',
                'address' => '',
                'email' => $request->user()->email,
                'phone' => '',
                'website' => '',
                'npwp' => '',
            ]
        );

        return response()->json($profile);
    }

    /**
     * Menyimpan / mengubah profile perusahaan.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:30',
            'website' => 'nullable|string|max:255',
            'npwp' => 'nullable|string|max:50',

            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $profile = CompanyProfile::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        if ($request->hasFile('logo')) {

            // Hapus logo lama
            if ($profile->logo_path) {
                Storage::disk('public')->delete($profile->logo_path);
            }

            // Simpan logo baru
            $data['logo_path'] = $request
                ->file('logo')
                ->store('company-logos', 'public');
        }

        unset($data['logo']);

        $profile->update($data);

        return response()->json([
            'message' => 'Profile perusahaan berhasil disimpan.',
            'profile' => $profile->fresh(),
        ]);
    }
}