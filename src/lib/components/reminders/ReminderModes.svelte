<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import ListItems from './ListItems.svelte';
	import ReminderMode from './ReminderMode.svelte';

	const { superProps } = $props();

	const { form: formData } = superProps;

	reminderModesRune.setModes($formData.reminders);

	$effect.pre(() => {
		reminderModesRune.setModes($formData.reminders);
	});

	// $effect(() => {
	// 	// $formData.reminders = reminderModesRune.modes;
	// 	// reminderModes = reminderModesRune.modes;
	// });

	const handleOnClick = () => {
		reminderModesRune.setModes([
			...reminderModesRune.modes,
			{
				mode: '',
				address: ''
			}
		]);
	};
</script>

<ListItems
	{superProps}
	list={reminderModesRune.modes}
	noneTxt="No reminder modes added yet"
	label="Reminder modes"
	inputName="reminders"
	{handleOnClick}
>
	{#each reminderModesRune.modes as reminderMode, i}
		<ReminderMode {superProps} {reminderMode} {i} />
	{/each}
</ListItems>
