<script lang="ts">
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import Icon from '@iconify/svelte';
	import FormItemWrapper from './FormItemWrapper.svelte';
	import type { SuperForm } from 'sveltekit-superforms';

	type Props = {
		children: any;
		superProps: SuperForm<TCreateReminderInput>;
		list: any[];
		noneTxt: string;
		label: string;
		inputName: keyof TCreateReminderInput;
		handleOnClick: () => void;
	};

	const {
		children,
		superProps,
		list,
		noneTxt = 'No reminder modes added yet',
		label = 'Reminder modes',
		inputName = 'reminders',
		handleOnClick
	}: Props = $props();
</script>

<FormItemWrapper {superProps} {label} {inputName}>
	<button class="btn-soft" type="button" onclick={handleOnClick}>
		<Icon icon="fe-plus" />
	</button>

	<div class="custom-card bg-white dark:bg-neutral-900">
		{#if list.length === 0}
			<p>{noneTxt}</p>
		{:else}
			<div class="space-y-3">
				{@render children()}
			</div>
		{/if}
	</div>
</FormItemWrapper>
