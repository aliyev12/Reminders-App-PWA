<script lang="ts">
	import Icon from '@iconify/svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	// $effect(() => {
	// 	const pop = document.getElementById('mobile-menu-popover');
	// 	if (pop) {
	// 		pop.showPopover(); // Force it open
	// 		pop.addEventListener('toggle', (e) => {
	// 			// Immediately re-open if something tries to close it
	// 			if (!pop.matches(':open')) pop.showPopover();
	// 		});
	// 	}
	// });
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

	<div
		id="mobile-menu-popover"
		popover
		class="h-auto max-h-[90vh] w-full overflow-auto bg-transparent px-5 py-2"
	>
		<div
			class="flex flex-col items-center rounded-3xl border border-white/20 bg-black/30 px-2 py-3 shadow-lg backdrop-blur-lg"
		>
			<ul class="flex flex-col items-center space-y-3">
				<li>
					<a
						href="/reminders"
						aria-current="page"
						class="block w-fit rounded-3xl border border-white/20 px-5 py-4 text-center text-white"
						>Reminders</a
					>
				</li>
				<li>
					<a
						href="/"
						aria-current="page"
						class="block w-fit rounded-3xl border border-white/20 px-5 py-4 text-center text-white"
						>Home</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
