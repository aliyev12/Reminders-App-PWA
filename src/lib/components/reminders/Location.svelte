<script lang="ts">
	import { type TReminderBase } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import SimpleFormItem from './SimpleFormItem.svelte';

	type Props = {
		superProps: SuperForm<TReminderBase>;
	};

	const { superProps }: Props = $props();
	const formData = $derived(superProps.form);
	const errors = $derived(superProps.errors);
	const constraints = $derived(superProps.constraints);
</script>

<SimpleFormItem
	inputId="location-addressLine1"
	label="Location"
	error={$errors?.location?.isSet?.[0] ?? null}
>
	<input
		id="location-isset"
		name="location.isSet"
		type="checkbox"
		class="shrink-0 rounded-sm border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
		{...$constraints?.location?.isSet}
		bind:checked={$formData.location.isSet}
	/>
	<span class="ms-2 text-sm text-gray-500 dark:text-neutral-400">Enable location</span>
</SimpleFormItem>

{#if $formData?.location?.isSet}
	<SimpleFormItem
		inputId="location-addressLine1"
		label="Address line 1"
		error={$errors?.location?.details?.addressLine1?.[0] ?? null}
		isRequired={true}
	>
		<input
			type="text"
			id="location-addressLine1"
			name="location-addressLine1"
			class={`${$errors?.location?.details?.addressLine1 ? 'input-error' : 'input-default '} custom-input`}
			bind:value={$formData.location.details.addressLine1}
			aria-invalid={$errors?.location?.details?.addressLine1 ? 'true' : undefined}
			{...$constraints?.location?.details?.addressLine1}
		/>
	</SimpleFormItem>
	<SimpleFormItem inputId="location-addressLine2" label="Address line 2" error={null}>
		<input
			type="text"
			id="location-addressLine2"
			name="location-addressLine2"
			class={`${$errors?.location?.details?.addressLine2 ? 'input-error' : 'input-default '} custom-input`}
			bind:value={$formData.location.details.addressLine2}
			aria-invalid={$errors?.location?.details?.addressLine2 ? 'true' : undefined}
			{...$constraints?.location?.details?.addressLine2}
		/>
	</SimpleFormItem>
	<SimpleFormItem
		inputId="location-city"
		label="City"
		error={$errors?.location?.details?.city?.[0] ?? null}
		isRequired={true}
	>
		<input
			type="text"
			id="location-city"
			name="location-city"
			class={`${$errors?.location?.details?.city ? 'input-error' : 'input-default '} custom-input`}
			bind:value={$formData.location.details.city}
			aria-invalid={$errors?.location?.details?.city ? 'true' : undefined}
			{...$constraints?.location?.details?.city}
		/>
	</SimpleFormItem>
	<SimpleFormItem
		inputId="location-state"
		label="State"
		error={$errors?.location?.details?.state?.[0] ?? null}
		isRequired={true}
	>
		<input
			type="text"
			id="location-state"
			name="location-state"
			class={`${$errors?.location?.details?.state ? 'input-error' : 'input-default '} custom-input`}
			bind:value={$formData.location.details.state}
			aria-invalid={$errors?.location?.details?.state ? 'true' : undefined}
			{...$constraints?.location?.details?.state}
		/>
	</SimpleFormItem>
	<SimpleFormItem
		inputId="location-postalCode"
		label="Postal Code"
		error={$errors?.location?.details?.postalCode?.[0] ?? null}
		isRequired={true}
	>
		<input
			type="text"
			id="location-postalCode"
			name="location-postalCode"
			class={`${$errors?.location?.details?.postalCode ? 'input-error' : 'input-default '} custom-input`}
			bind:value={$formData.location.details.postalCode}
			aria-invalid={$errors?.location?.details?.postalCode ? 'true' : undefined}
			{...$constraints?.location?.details?.postalCode}
		/>
	</SimpleFormItem>
{/if}
