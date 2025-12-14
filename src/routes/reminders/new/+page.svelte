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
	import Location2 from '$lib/components/reminders/Location2.svelte';

	type Props = { data: PageData };

	const { data }: Props = $props();

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
		<FormItem {superProps} inputType="text" inputName="title" label="Title" />
		<FormItem {superProps} inputType="textarea" inputName="description" label="Description" />
		<ReminderModes {superProps} />
		<Alerts {superProps} />
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

		<Location2 {superProps} />

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
