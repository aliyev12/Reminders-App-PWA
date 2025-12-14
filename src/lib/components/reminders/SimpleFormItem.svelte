<script lang="ts">
	import { Icon } from 'lucide-svelte';
	import AsteriskIcon from '$lib/assets/AsteriskIcon.svelte';
	import ErrorIcon from '$lib/assets/ErrorIcon.svelte';

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
			<AsteriskIcon />
		{/if}
	</label>
	<div class="relative flex items-center">
		{@render children()}
		{#if error}
			<div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
				<ErrorIcon />
			</div>
		{/if}
	</div>
	{#if error}
		<p class="mt-2 text-sm text-red-600" id="hs-validation-name-error-helper">
			{error}
		</p>
	{/if}
</div>
