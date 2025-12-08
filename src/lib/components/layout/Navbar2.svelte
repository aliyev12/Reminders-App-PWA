<script lang="ts">
	import Icon from '@iconify/svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav class="fixed right-0 bottom-0 z-50 h-16 w-full px-5 pb-2">
	<div
		class="h-full w-full rounded-full border border-white/20 bg-black/30 px-2 py-3 shadow-lg backdrop-blur-lg"
	>
		<div class="flex h-full items-center justify-between">
			<ThemeToggle />
			<button
				id="menu-button"
				type="button"
				popovertarget="mobile-menu-popover"
				class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
			>
				<span class="sr-only">Open main menu</span>
				<Icon icon="feather-menu" font-size="30" color="white" />
			</button>
		</div>
	</div>

	<div id="mobile-menu-popover" popover class="w-full bg-transparent px-5 py-2">
		<div
			class="flex w-full flex-col items-center rounded-3xl border border-white/20 bg-black/30 px-2 py-3 shadow-lg backdrop-blur-lg"
		>
			<ul class="space-y-3">
				<li>
					<a
						href="#"
						aria-current="page"
						class="rounded-3xl border border-white/20 px-5 py-4 text-white">Home</a
					>
				</li>
				<li>
					<a
						href="#"
						aria-current="page"
						class="rounded-3xl border border-white/20 px-5 py-4 text-white">Home</a
					>
				</li>
			</ul>
			<!-- <a
				href="#"
				aria-current="page"
				class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</a
			> -->
		</div>
	</div>
</nav>
