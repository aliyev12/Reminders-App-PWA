<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import { z } from 'zod/v3';
	import ListItem from './ListItem.svelte';

	const { superProps, i } = $props();

	let reminderAlerts = $derived(reminderModesRune.alerts);
	const formData = $derived(superProps.form);

	const ReminderAlertInputSchema = z.number().min(3000, 'Alert must be at least 3000 milliseconds');

	let alert = $state(0);

	$effect.pre(() => {
		alert = reminderAlerts[i];
	});

	const validationResult = $derived(ReminderAlertInputSchema.safeParse(alert));
	let isValid = $derived(validationResult.success);

	let errorMsg = $derived.by(() => {
		const issue = validationResult.error?.issues[0];
		return issue?.message;
	});

	let isSaved = $derived($formData.alerts.some((x: number) => x === alert));

	const handleSave = () => {
		if (isValid) {
			const isNewItem = i >= reminderAlerts.length;

			if (isNewItem) {
				reminderModesRune.setAlerts([...reminderAlerts, alert]);
			} else {
				const newItems = reminderModesRune.alerts;
				newItems[i] = alert;
				reminderModesRune.setAlerts([...newItems]);
			}
			$formData.alerts = reminderModesRune.alerts;
			isSaved = true;
		}
	};

	const handleDelete = () => {
		const newReminderAlerts = reminderModesRune.alerts;
		newReminderAlerts.splice(i, 1);
		reminderModesRune.setAlerts([...newReminderAlerts]);
		$formData.alerts = newReminderAlerts;
	};

	const handleEdit = () => {
		isSaved = false;
	};
</script>

<ListItem {isValid} {isSaved} {handleSave} {handleDelete} {handleEdit}>
	<label>
		Alert in milliseconds
		<input
			name={`alert-${i}`}
			class={`custom-input ${!isValid ? 'input-error' : 'input-default'}`}
			type="number"
			bind:value={alert}
		/>
	</label>
	{#if errorMsg}
		<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
			{errorMsg}
		</p>
	{/if}
</ListItem>
