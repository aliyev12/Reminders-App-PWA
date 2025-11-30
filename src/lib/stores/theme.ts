import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Type for theme state
export type Theme = 'light' | 'dark';

// Function to get initial theme preference
function getInitialTheme(): Theme {
	if (!browser) {
		// Default to dark on the server (SSR)
		return 'dark';
	}

	// 1. Check for saved preference in localStorage
	const savedTheme = localStorage.getItem('theme') as Theme | null;
	if (savedTheme) {
		return savedTheme;
	}

	// 2. Check for system preference
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}

	// 3. Default to light
	return 'light';
}

// Create the writable store with the initial value
export const theme = writable<Theme>(getInitialTheme());

// Subscribe to the store to update localStorage whenever the theme changes
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);

		// --- CRITICAL: Apply the 'dark' class to the HTML element ---
		const html = document.documentElement;
		if (value === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	});
}
