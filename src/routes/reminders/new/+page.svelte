<script lang="ts">
	import FormItem from '$lib/components/reminders/FormItem.svelte';
	import ReminderModes from '$lib/components/reminders/ReminderModes.svelte';
	import type { IInputOption } from '$lib/utils/types';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const superProps = superForm(data.form, {
		taintedMessage: true,
		dataType: 'json'
	});

	const { form: formData, enhance, message, submitting } = superProps;

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

	$: isSubmitting = $submitting;
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
		<FormItem {superProps} inputType="text" inputName="title" label="Title" />
		<FormItem {superProps} inputType="textarea" inputName="description" label="Description" />
		<ReminderModes {superProps} />
		<FormItem
			{superProps}
			inputType="radios"
			inputName="is_recurring"
			label="Event type"
			options={isRecurringOptions}
		/>

		{#if $formData.is_recurring === true}
			<FormItem {superProps} inputName="start_date" label="Start date" />
			<FormItem {superProps} inputName="end_date" label="End date" />
			<FormItem {superProps} inputType="text" inputName="recurrence" label="Recurrence Cron" />
		{:else if $formData.is_recurring === false}
			<FormItem {superProps} inputName="date" label="Date" />
		{/if}

		<button class="btn-primary" type="submit" disabled={isSubmitting}>
			{#if isSubmitting}
				Submitting
			{:else}
				Create
			{/if}
		</button>
	</form>

	<SuperDebug data={$formData} />
</div>
