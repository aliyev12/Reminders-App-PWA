<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import { type TReminderBase } from '$lib/utils/schemas';
	import { AlertSchema } from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import ListItem from './ListItem.svelte';
	import Icon from '@iconify/svelte';
	import type { EventDispatcher } from 'svelte';
	import type { keyof } from 'zod';

	type Props = {
		superProps: SuperForm<TReminderBase>;
		alertId: string;
	};

	const { superProps, alertId }: Props = $props();
	const formData = $derived(superProps.form);
	const alert = $derived(reminderModesRune.getAlertById(alertId));
	const validationResult = $derived(AlertSchema.safeParse(alert));
	let isValid = $derived(validationResult.success);

	let errorMsg = $derived.by(() => {
		const issue = validationResult.error?.issues[0];
		return issue?.message;
	});

	const handleSave = () => {
		if (isValid) {
			$formData.alerts = reminderModesRune.alerts.map((x) => ({ id: x.id, time: x.time }));
			reminderModesRune.setAlertIsBeingAdded(false);
		}
	};

	const handleDelete = () => {
		$formData.alerts = reminderModesRune.alerts
			.filter((x) => x.id !== alertId)
			.map((x) => ({ id: x.id, time: x.time }));
		reminderModesRune.removeAlert(alertId);
		reminderModesRune.setAlertIsBeingAdded(false);
	};

	const handleEdit = () => {
		reminderModesRune.setAlertIsBeingAdded(true);
		reminderModesRune.setAlertEditable(alertId, true);
	};

	const disableDelete = $derived(() => {
		const alertFromForm = $formData.alerts.find((x) => x.id === alertId);
		if (alertFromForm && alert.editable) return true;
		return false;
	});

	const alertOptions = $state({
		hours: 0,
		days: 0,
		minutes: 0,
		seconds: 0
	});
	const otherOptions = $state({
		hours: false,
		days: false,
		minutes: false
	});

	type TOptionKeys = 'hours' | 'days' | 'minutes';

	const handleChange = (e: Event) => {
		const value = Number((e.target as HTMLSelectElement).value);
		const name = (e.target as HTMLSelectElement).name as TOptionKeys;

		if (value !== -1) {
			alertOptions[name] = value;
			otherOptions[name] = false;
		} else {
			alertOptions[name] = 0;
			otherOptions[name] = true;
		}
	};
</script>

<ListItem
	{isValid}
	{handleSave}
	{handleDelete}
	{handleEdit}
	editable={alert.editable}
	disableDelete={disableDelete()}
>
	<!-- <label>
		Alert in milliseconds
		<input
			name={`alert-${alertId}`}
			class={`custom-input ${!isValid ? 'input-error' : 'input-default'}`}
			type="number"
			disabled={!alert.editable}
			bind:value={alert.time}
		/>
	</label> -->

	<label>
		Hours
		<select
			name="hours"
			onchange={handleChange}
			class="block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
		>
			<option selected={true} value={0}>0 hours</option>
			<option value={3600000}>1 hour</option>
			<option value={3600000 * 2}>2 hours</option>
			<option value={3600000 * 3}>3 hours</option>
			<option value={-1}>Other</option>
		</select>
	</label>

	{#if otherOptions.hours === true}
		<input id="alert-hours" bind:value={alertOptions.hours} class={`custom-input input-default`} />
	{/if}

	<label>
		Days
		<select
			name="days"
			onchange={handleChange}
			class="block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
		>
			<option selected={true} value={0}>0 days</option>
			<option value={86400000}>1 day</option>
			<option value={86400000 * 2}>2 days</option>
			<option value={86400000 * 3}>3 days</option>
			<option value={-1}>Other</option>
		</select>
	</label>

	{#if otherOptions.days === true}
		<input id="alert-days" bind:value={alertOptions.days} class={`custom-input input-default`} />
	{/if}

	<label>
		Minutes
		<select
			name="minutes"
			onchange={handleChange}
			class="block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
		>
			<option selected={true} value={0}>0 minutes</option>
			<option value={60000}>1 minute</option>
			<option value={60000 * 5}>5 minutes</option>
			<option value={60000 * 10}>10 minutes</option>
			<option value={60000 * 15}>15 minutes</option>
			<option value={60000 * 30}>30 minutes</option>
			<option value={60000 * 45}>45 minutes</option>
			<option value={-1}>Other</option>
		</select>
	</label>
	{#if otherOptions.minutes === true}
		<input
			id="alert-minutes"
			bind:value={alertOptions.minutes}
			class={`custom-input input-default`}
		/>
	{/if}
	<label>
		Seconds
		<input
			id="alert-seconds"
			bind:value={alertOptions.seconds}
			class={`custom-input input-default`}
		/>
	</label>

	{#if errorMsg}
		<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
			{errorMsg}
		</p>
	{/if}
</ListItem>
