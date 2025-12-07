<script lang="ts">
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let inputType: string | null = null;
	export let inputName: keyof TCreateReminderInput;
	export let label: string;

	const { errors } = superProps;
</script>

<div class="max-w-lg">
	{#if inputType === 'radios'}
		<legend class="text-md mb-2 block font-medium">{label}</legend>
	{:else}
		<label for={inputName} class="text-md mb-2 block font-medium">{label}</label>
	{/if}
	<div class="relative">
		<slot></slot>
		{#if $errors[inputName] && !$errors.reminders}
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
	{#if $errors[inputName]}
		<p class="mt-2 text-sm text-red-600" id="hs-validation-name-error-helper">
			{#if $errors.reminders?._errors?.[0]}
				{$errors.reminders._errors[0]}
			{:else}
				{$errors[inputName]}
			{/if}
		</p>
	{/if}
</div>
