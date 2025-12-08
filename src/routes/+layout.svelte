<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Navbar2 from '$lib/components/layout/Navbar2.svelte';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icons/favicon.ico" />
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-gray-100 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"
>
	<Navbar />

	<!-- <footer class="flex justify-end p-4"></footer> -->
	<main class="container mx-auto grow p-4">
		{@render children()}
	</main>
	<Navbar2 />
</div>
