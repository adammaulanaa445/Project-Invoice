<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    // Mengambil semua produk milik user yang sedang login, diurutkan berdasarkan nama
    public function index(Request $request)
    {
        return Product::where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get();
    }

    // POST /api/products
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create([
            ...$data,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($product, 201);
    }

    // GET /api/products/{product}
    public function show(Request $request, Product $product)
    {
        if ($product->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke produk ini.'
            ], 403);
        }

        return $product;
    }

    // PUT /api/products/{product}
    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke produk ini.'
            ], 403);
        }

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
        ]);

        $product->update($data);

        return $product;
    }

    // DELETE /api/products/{product}
    public function destroy(Request $request, Product $product)
    {
        if ($product->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke produk ini.'
            ], 403);
        }

        $product->delete();

        return response()->noContent();
    }
}
