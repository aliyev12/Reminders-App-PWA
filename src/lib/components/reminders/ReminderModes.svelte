<script lang="ts">
	import type { TCreateReminderInput, TReminderMode } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormItemWrapper from './FormItemWrapper.svelte';
	import Icon from '@iconify/svelte';
	import ReminderMode from './ReminderMode.svelte';
	import { reminderModesRune } from '$lib/stores/reminders.svelte';

	// export let superProps: SuperForm<TCreateReminderInput>;
	const { superProps } = $props();

	const { form: formData, errors, constraints } = superProps;

	// let reminderModes: TReminderMode[] = $formData.reminders;
	reminderModesRune.setModes($formData.reminders);

	$effect.pre(() => {
		reminderModesRune.setModes($formData.reminders);
	});

	// let reminderModes: TReminderMode[];

	$effect(() => {
		// $formData.reminders = reminderModesRune.modes;
		// reminderModes = reminderModesRune.modes;
	});

	const handleOnClick = () => {
		reminderModesRune.setModes([
			...reminderModesRune.modes,
			{
				mode: '',
				address: ''
			}
		]);
		// reminderModes = [
		// 	...reminderModes,
		// 	{
		// 		mode: '',
		// 		address: ''
		// 	}
		// ];
		// $formData.reminders = reminderModes;
	};

	// $: {
	// 	// $formData.reminders = reminderModes;
	// 	// reminderModes = $formData.reminders;
	// 	reminderModes = reminderModesRune.modes;
	// 	console.log(reminderModes);
	// }
</script>

<FormItemWrapper {superProps} label="Reminder modes" inputName="reminders">
	<button class="btn-soft" type="button" onclick={handleOnClick}>
		<Icon icon="fe-plus" />
	</button>

	<div class="custom-card">
		{#if reminderModesRune.modes.length === 0}
			<p>No reminder modes added yet</p>
		{:else}
			<div class="space-y-3">
				{#each reminderModesRune.modes as reminderMode, i}
					<ReminderMode {superProps} {reminderMode} {i} />
				{/each}
			</div>
		{/if}
	</div>
</FormItemWrapper>
