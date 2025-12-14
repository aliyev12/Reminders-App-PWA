<script lang="ts">
	import AsteriskIcon from '$lib/assets/AsteriskIcon.svelte';
	import ErrorIcon from '$lib/assets/ErrorIcon.svelte';
	import type { TReminderBase } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	type Props = {
		children: any;
		isRequired?: boolean;
		superProps: SuperForm<TReminderBase>;
		inputType?: string;
		inputName: keyof TReminderBase;
		label: string;
	};

	const { children, isRequired = false, superProps, inputType, inputName, label }: Props = $props();
	const errors = $derived(superProps.errors);
</script>

<div class="max-w-lg">
	{#if inputType === 'radios'}
		<legend class="text-md mb-2 block flex font-medium"
			>{label}
			{#if isRequired}
				<AsteriskIcon />
			{/if}</legend
		>
	{:else}
		<label for={inputName} class="text-md mb-2 block flex font-medium"
			>{label}
			{#if isRequired}
				<AsteriskIcon />
			{/if}</label
		>
	{/if}
	<div class="relative">
		{@render children()}
		{#if $errors[inputName] && !$errors.reminders}
			<div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
				<ErrorIcon />
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
