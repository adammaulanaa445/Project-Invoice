import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

// Konfigurasi utama SvelteKit. Adapter WAJIB didefinisikan di sini
// (bukan di vite.config.js), supaya SvelteKit tahu harus build project
// untuk platform mana (Vercel, Node, static, dst).
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto otomatis mendeteksi kamu deploy di Vercel,
		// lalu membangun setiap +server.js jadi serverless function.
		adapter: adapter()
	}
};

export default config;