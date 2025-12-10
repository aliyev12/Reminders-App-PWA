<script lang="ts">
	import type { TReminderBase } from '$lib/utils/schemas';
	import Icon from '@iconify/svelte';
	import FormItemWrapper from './FormItemWrapper.svelte';
	import type { SuperForm } from 'sveltekit-superforms';

	type Props = {
		children: any;
		superProps: SuperForm<TReminderBase>;
		list: any[];
		noneTxt: string;
		label: string;
		inputName: keyof TReminderBase;
		handleOnClick: () => void;
		isBeingAdded: boolean;
	};

	const {
		children,
		superProps,
		list,
		noneTxt = 'No reminder modes added yet',
		label = 'Reminder modes',
		inputName = 'reminders',
		handleOnClick,
		isBeingAdded
	}: Props = $props();
</script>

<FormItemWrapper {superProps} {label} {inputName}>
	{#if list.length === 0}
		<p class="mb-3 text-sm italic">{noneTxt}</p>
	{:else}
		<div class="custom-card bg-white dark:bg-neutral-900">
			<div class="space-y-3">
				{@render children()}
			</div>
		</div>
	{/if}
	<button
		class="btn-soft flex-important mt-3 justify-self-center"
		type="button"
		onclick={handleOnClick}
		disabled={isBeingAdded}
	>
		<Icon icon="fe-plus" />
	</button>
</FormItemWrapper>
