<script lang="ts">
	import type { TCreateReminderInput, TReminderMode } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormItemWrapper from './FormItemWrapper.svelte';
	import Icon from '@iconify/svelte';
	import ReminderMode from './ReminderMode.svelte';
	// import { reminderModesRune } from '$lib/stores/reminders';

	export let superProps: SuperForm<TCreateReminderInput>;

	const { form: formData, errors, constraints } = superProps;

	let reminderModes: TReminderMode[] = $formData.reminders;
	// reminderModesRune.setModes($formData.reminders);
	// let reminderModes: TReminderMode[] = reminderModesRune.modes;

	const handleOnClick = () => {
		// reminderModesRune.setModes([
		// 	...reminderModesRune.modes,
		// 	{
		// 		mode: '',
		// 		address: ''
		// 	}
		// ]);
		reminderModes = [
			...reminderModes,
			{
				mode: '',
				address: ''
			}
		];
		// $formData.reminders = reminderModes;
	};

	$: {
		// $formData.reminders = reminderModes;
		// reminderModes = $formData.reminders;
	}
</script>

<FormItemWrapper {superProps} label="Reminder modes" inputName="reminders">
	<button class="btn-soft" type="button" on:click={handleOnClick}>
		<Icon icon="fe-plus" />
	</button>

	<div class="custom-card">
		{#if reminderModes.length === 0}
			<p>No reminder modes added yet</p>
		{:else}
			<div class="space-y-3">
				{#each reminderModes as reminderMode, i}
					<ReminderMode bind:reminderModes {superProps} {reminderMode} {i} />
				{/each}
			</div>
		{/if}
	</div>
</FormItemWrapper>
