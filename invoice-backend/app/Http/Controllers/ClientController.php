<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // GET /api/clients
    // Mengambil semua klien milik user yang sedang login, diurutkan berdasarkan nama
    public function index(Request $request)
    {
        return Client::where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get();
    }

    // POST /api/clients
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:30',
        ]);

        $client = Client::create([
            ...$data,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($client, 201);
    }

    // GET /api/clients/{client}
    public function show(Request $request, Client $client)
    {
        if ($client->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke klien ini.'
            ], 403);
        }

        return $client;
    }

    // PUT /api/clients/{client}
    public function update(Request $request, Client $client)
    {
        if ($client->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke klien ini.'
            ], 403);
        }

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:30',
        ]);

        $client->update($data);

        return $client;
    }

    // DELETE /api/clients/{client}
    public function destroy(Request $request, Client $client)
    {
        if ($client->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke klien ini.'
            ], 403);
        }

        $client->delete();

        return response()->noContent();
    }
}
