<script lang="ts">
	import { Icon } from 'lucide-svelte';

	type Props = {
		children: any;
		inputId: string;
		label: string;
		error: string | null;
		isRequired?: boolean;
	};

	const { children, inputId, label, error, isRequired = false }: Props = $props();
</script>

<div class="max-w-lg">
	<label for={inputId} class="text-md mb-2 flex font-medium"
		>{label}
		{#if isRequired}
			<svg
				class="ml-1"
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				><path
					fill="#f00"
					d="M11 21v-6.6l-4.65 4.675l-1.425-1.425L9.6 13H3v-2h6.6L4.925 6.35L6.35 4.925L11 9.6V3h2v6.6l4.65-4.675l1.425 1.425L14.4 11H21v2h-6.6l4.675 4.65l-1.425 1.425L13 14.4V21z"
				/></svg
			>
		{/if}
	</label>
	<div class="relative flex items-center">
		{@render children()}
		{#if error}
			<div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
				<svg
					class="size-4 shrink-0 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" x2="12" y1="8" y2="12"></line>
					<line x1="12" x2="12.01" y1="16" y2="16"></line>
				</svg>
			</div>
		{/if}
	</div>
	{#if error}
		<p class="mt-2 text-sm text-red-600" id="hs-validation-name-error-helper">
			{error}
		</p>
	{/if}
</div>
