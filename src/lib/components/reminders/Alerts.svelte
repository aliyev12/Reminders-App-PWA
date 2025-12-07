<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import Alert from './Alert.svelte';
	import ListItems from './ListItems.svelte';

	const { superProps } = $props();

	const { form: formData } = superProps;

	reminderModesRune.setAlerts($formData.alerts);

	$effect.pre(() => {
		reminderModesRune.setAlerts($formData.alerts);
	});

	$effect(() => {
		console.log('reminderModesRune.alerts = ', JSON.stringify(reminderModesRune.alerts));
	});

	const handleOnClick = () => {
		reminderModesRune.setAlerts([
			...reminderModesRune.alerts,
			86400000, // 24h
			1000
		]);
	};
</script>

<ListItems
	{superProps}
	list={reminderModesRune.alerts}
	noneTxt="No alerts added yet"
	label="Alerts"
	inputName="alerts"
	{handleOnClick}
>
	{#each reminderModesRune.alerts as alertValue, i (alertValue)}
		<Alert {i} {superProps} />
	{/each}
</ListItems>
