<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import Alert from './Alert.svelte';
	import ListItems from './ListItems.svelte';
	import { nanoid } from 'nanoid';

	const { superProps } = $props();

	const formData = $derived(superProps.form);

	reminderModesRune.setAlerts($formData.alerts);

	$effect.pre(() => {
		reminderModesRune.setAlerts($formData.alerts);
	});

	const handleOnClick = () => {
		reminderModesRune.setAlertIsBeingAdded(true);
		const newAlert = { id: nanoid(), time: 86400000, editable: true }; // 24h
		reminderModesRune.addAlert(newAlert);
	};
</script>

<ListItems
	{superProps}
	list={reminderModesRune.alerts}
	noneTxt="No alerts added yet"
	label="Alerts"
	inputName="alerts"
	isRequired={true}
	{handleOnClick}
	isBeingAdded={reminderModesRune.alertIsBeingAdded || reminderModesRune.modeIsBeingAdded}
>
	{#each reminderModesRune.alerts as alertItem (alertItem.id)}
		<Alert alertId={alertItem.id} {superProps} />
	{/each}
</ListItems>
