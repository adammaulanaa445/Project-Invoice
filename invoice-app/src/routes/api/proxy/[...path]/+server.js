// src/routes/api/proxy/[...path]/+server.js
//
// File ini bertugas sebagai "perantara" (proxy) antara frontend SvelteKit
// dan backend Laravel di InfinityFree.
//
// Karena file ini jalan di SERVER (bukan di browser), request ke InfinityFree
// dikirim dari server-ke-server — tidak pernah lewat browser sama sekali.
// Akibatnya, aturan CORS browser tidak berlaku di sini, jadi masalah
// preflight OPTIONS yang diblokir InfinityFree otomatis terhindari.
//
// Analogi Laravel: ini seperti membuat satu Controller umum yang menerima
// semua request, lalu meneruskannya (forward) ke service eksternal
// menggunakan Http::get() / Http::post() dari sisi server Laravel,
// bukan langsung dari JavaScript di browser.

// Ganti sesuai domain backend Laravel kamu di InfinityFree
const BACKEND_URL = 'https://app-inv.xo.je';

/**
 * Fungsi umum untuk meneruskan (forward) request apapun ke backend Laravel.
 * Dipakai ulang oleh semua method (GET, POST, PUT, DELETE, dst).
 */
async function forwardRequest(event, method) {
	const { params, request, url } = event;

	// Gabungkan path yang diminta frontend + query string asli
	// Contoh: /api/proxy/login -> diteruskan ke https://app-inv.xo.je/login
	const targetUrl = `${BACKEND_URL}/${params.path}${url.search}`;

	// Ambil body request kalau method-nya bukan GET/HEAD
	const hasBody = method !== 'GET' && method !== 'HEAD';
	const body = hasBody ? await request.text() : undefined;

	// Salin header penting saja (jangan salin semua header mentah-mentah,
	// supaya header seperti "host" milik Vercel tidak ikut terbawa)
	const headers = {
		'Content-Type': request.headers.get('content-type') || 'application/json',
		Accept: 'application/json'
	};

	// Kalau backend butuh token Authorization, teruskan juga
	const authHeader = request.headers.get('authorization');
	if (authHeader) {
		headers['Authorization'] = authHeader;
	}

	try {
		const response = await fetch(targetUrl, {
			method,
			headers,
			body
		});

		const responseBody = await response.text();

		// Kirim balik response Laravel apa adanya ke frontend
		return new Response(responseBody, {
			status: response.status,
			headers: {
				'Content-Type': response.headers.get('content-type') || 'application/json'
			}
		});
	} catch (error) {
		// Kalau backend InfinityFree down/timeout, jangan sampai server crash
		console.error('Proxy error saat menghubungi backend:', error);
		return new Response(
			JSON.stringify({ message: 'Gagal menghubungi server backend' }),
			{ status: 502, headers: { 'Content-Type': 'application/json' } }
		);
	}
}

// SvelteKit mewajibkan setiap method HTTP didefinisikan terpisah
export async function GET(event) {
	return forwardRequest(event, 'GET');
}

export async function POST(event) {
	return forwardRequest(event, 'POST');
}

export async function PUT(event) {
	return forwardRequest(event, 'PUT');
}

export async function PATCH(event) {
	return forwardRequest(event, 'PATCH');
}

export async function DELETE(event) {
	return forwardRequest(event, 'DELETE');
}