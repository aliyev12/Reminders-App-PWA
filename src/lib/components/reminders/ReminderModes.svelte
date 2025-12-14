<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import { nanoid } from 'nanoid';
	import ListItems from './ListItems.svelte';
	import ReminderMode from './ReminderMode.svelte';
	import type { TReminderModeUI } from '$lib/utils/schemas';

	const { superProps } = $props();

	const formData = $derived(superProps.form);

	reminderModesRune.setModes($formData.reminders);

	$effect.pre(() => {
		reminderModesRune.setModes($formData.reminders);
	});

	const handleOnClick = () => {
		reminderModesRune.setModeIsBeingAdded(true);
		const newMode: TReminderModeUI = {
			id: nanoid(),
			mode: 'email',
			address: '',
			editable: true
		};
		reminderModesRune.addMode(newMode);
	};
</script>

<ListItems
	{superProps}
	list={reminderModesRune.modes}
	noneTxt="No reminder modes added yet"
	label="Reminder modes"
	inputName="reminders"
	isRequired={true}
	{handleOnClick}
	isBeingAdded={reminderModesRune.alertIsBeingAdded || reminderModesRune.modeIsBeingAdded}
>
	{#each reminderModesRune.modes as reminderMode (reminderMode.id)}
		<ReminderMode modeId={reminderMode.id} {superProps} />
	{/each}
</ListItems>
