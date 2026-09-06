import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Adapter dan compilerOptions dipindahkan ke svelte.config.js,
// karena itu tempat yang benar untuk konfigurasi tersebut.
// vite.config.js cukup fokus untuk konfigurasi build tool Vite saja.
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	]
});