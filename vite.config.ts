import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),

		SvelteKitPWA({
			mode: 'production',
			base: '/',
			scope: '/',
			// 3. Define the main manifest file content
			manifest: {
				name: 'Reminders App',
				short_name: 'Reminders',
				description: 'App for managing reminders',
				theme_color: '#ffffff',
				background_color: '#34d399',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: '/icons/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			// 4. Configure Workbox to use the injectManifest strategy
			strategies: 'injectManifest',
			filename: 'sw.js',
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			}
		})
	]
});
