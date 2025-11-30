<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { theme } from '$lib/stores/theme'; 
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-100 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
	<Navbar />
	<main class="container mx-auto p-4">
		{@render children()}
	</main>
	<footer class="p-4 flex justify-end">
		<ThemeToggle />
	</footer>
</div>