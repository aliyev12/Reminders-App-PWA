<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import { type TReminderBase } from '$lib/utils/schemas';
	import { AlertSchema } from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import ListItem from './ListItem.svelte';

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
</script>

<ListItem
	{isValid}
	{handleSave}
	{handleDelete}
	{handleEdit}
	editable={alert.editable}
	disableDelete={disableDelete()}
>
	<label>
		Alert in milliseconds
		<input
			name={`alert-${alertId}`}
			class={`custom-input ${!isValid ? 'input-error' : 'input-default'}`}
			type="number"
			disabled={!alert.editable}
			bind:value={alert.time}
		/>
	</label>
	{#if errorMsg}
		<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
			{errorMsg}
		</p>
	{/if}
</ListItem>
