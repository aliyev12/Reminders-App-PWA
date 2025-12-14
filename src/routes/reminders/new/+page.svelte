<script lang="ts">
	import Alerts from '$lib/components/reminders/Alerts.svelte';
	import FormItem from '$lib/components/reminders/FormItem.svelte';
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import ReminderModes from '$lib/components/reminders/ReminderModes.svelte';
	import type { IInputOption } from '$lib/utils/types';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Location from '$lib/components/reminders/Location.svelte';
	import SimpleFormItem from '$lib/components/reminders/SimpleFormItem.svelte';

	type Props = { data: PageData };

	const { data }: Props = $props();

	const superProps = superForm(data.form, {
		taintedMessage: true,
		dataType: 'json'
	});

	const { enhance, message, submitting } = superProps;
	const formData = $derived(superProps.form);
	const errors = $derived(superProps.errors);
	const constraints = $derived(superProps.constraints);

	const isRecurringOptions: IInputOption[] = [
		{
			value: false,
			label: 'Single event'
		},
		{
			value: true,
			label: 'Recurring'
		}
	];

	const isSubmitting = $derived($submitting);
</script>

<div class="flex flex-col items-center pt-4">
	<h1 class="mb-5 text-3xl">Add a new reminder</h1>

	{#if $message}
		<div
			class="mb-4 rounded-lg p-3 font-semibold text-white"
			class:bg-green-500={$message.includes('Successfully')}
			class:bg-red-500={!$message.includes('Successfully')}
		>
			{$message}
		</div>
	{/if}

	<form method="POST" use:enhance class="w-full space-y-4">
		<SimpleFormItem
			inputId="title"
			label="Title"
			error={$errors?.title?.[0] ?? null}
			isRequired={true}
		>
			<input
				type="text"
				id="title"
				name="title"
				class={`${$errors?.title?.[0] ? 'input-error' : 'input-default '} custom-input`}
				bind:value={$formData.title}
				aria-invalid={$errors?.title?.[0] ? 'true' : undefined}
				aria-describedby="title"
				{...$constraints?.title}
			/>
		</SimpleFormItem>

		<SimpleFormItem
			inputId="description"
			label="Description"
			error={$errors?.description?.[0] ?? null}
			isRequired={true}
		>
			<textarea
				id="description"
				name="description"
				bind:value={$formData.description}
				class={`${$errors?.description ? 'input-error' : 'input-default '} custom-input`}
				rows="3"
				aria-invalid={$errors?.description ? 'true' : undefined}
				aria-describedby="description"
				{...$constraints?.description}
			></textarea>
		</SimpleFormItem>

		<ReminderModes {superProps} />
		<Alerts {superProps} />
		<FormItem
			{superProps}
			inputType="radios"
			inputName="is_recurring"
			label="Event type"
			isRequired={true}
			options={isRecurringOptions}
		/>

		{#if $formData.is_recurring === true}
			<FormItem {superProps} inputName="start_date" label="Start date" />
			<FormItem {superProps} inputName="end_date" label="End date" />
			<FormItem {superProps} inputType="text" inputName="recurrence" label="Recurrence Cron" />
		{:else if $formData.is_recurring === false}
			<FormItem {superProps} inputName="date" label="Date" />
		{/if}

		<Location {superProps} />

		<hr class="mt-5 border border-gray-400/40" />
		<button
			class="btn-primary mt-5 justify-self-center"
			type="submit"
			disabled={isSubmitting ||
				reminderModesRune.alertIsBeingAdded ||
				reminderModesRune.modeIsBeingAdded}
		>
			{#if isSubmitting}
				Submitting
			{:else}
				Create
			{/if}
		</button>
	</form>

	<div class="mt-10 w-full">
		<SuperDebug data={$formData} />
	</div>
</div>
