/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		// This line MUST correctly point to ALL your Svelte files
		'./src/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {}
	},
	plugins: []
};
