
const BACKEND_URL = 'http://localhost:8000';

/**
 * Fungsi umum untuk meneruskan (forward) requst apapun ke backend Laravel.
 * Dipakai ulang oleh semua method (GET, POST, PUT, DELETE, dst).
 */
async function forwardRequest(event, method) {
	const { params, request, url } = event;

	// Gabungkan path yang diminta frontend + query string asli
	// Contoh: /api/proxy/login -> diteruskan ke http://localhost:8000/api/login (dev) atau domain production
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