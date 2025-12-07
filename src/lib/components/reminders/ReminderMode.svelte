<script lang="ts">
	import Icon from '@iconify/svelte';
	import { z } from 'zod/v3';
	import isMobilePhone from 'validator/lib/isMobilePhone';
	import type { TCreateReminderInput, TReminderMode } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import ListItem from './ListItem.svelte';

	// export let superProps: SuperForm<TCreateReminderInput>;
	const { superProps, reminderMode, i } = $props();
	// export let reminderMode: TReminderMode;
	// export let i: number;
	// export let reminderModes: TReminderMode[];

	let reminderModes = $derived(reminderModesRune.modes);

	const { form: formData, errors, constraints } = superProps;

	type TMode = 'email' | 'sms' | 'push' | 'ical';

	const ReminderModeInputSchema = z.discriminatedUnion('mode', [
		z.object({
			mode: z.literal('email'),
			address: z.string().email('Invalid email address')
		}),
		z.object({
			mode: z.literal('sms'),
			address: z.string().refine((val) => isMobilePhone(val), {
				message: 'Invalid phone number'
			})
		}),
		z.object({
			mode: z.literal('push'),
			address: z.string().min(1, 'Push token required')
		}),
		z.object({
			mode: z.literal('ical'),
			address: z.string().url('iCalendar URL must be a valid URL')
		})
	]);

	let mode = $state<TMode>(reminderMode.mode as TMode);
	let address = $state(reminderMode.address);

	$effect(() => {
		mode = reminderMode.mode as TMode;
		address = reminderMode.address;
	});
	// let isValid = false;

	const validationResult = $derived(ReminderModeInputSchema.safeParse({ mode, address }));
	let isValid = $derived(validationResult.success);

	let errorMsg = $derived.by(() => {
		const issue = validationResult.error?.issues[0];
		if (issue?.path[0] === 'address') {
			return issue.message;
		} else {
			return '';
		}
	});

	let isSaved = $state(
		$formData.reminders.some((x: TReminderMode) => x.mode === mode && x.address === address)
	);

	$effect(() => {
		const matchesSaved = $formData.reminders.some(
			(x: TReminderMode) => x.mode === mode && x.address === address
		);

		if (matchesSaved) {
			isSaved = true;
		} else {
			// If the current input does not match a saved item, only mark as not saved if we are not editing.
			// When editing, isSaved is explicitly set to false by handleEdit().
			if (isSaved) {
				isSaved = false;
			}
		}
	});

	const handleSave = () => {
		if (isValid) {
			// const existingItem = reminderModes[i];
			const isNewItem = i >= reminderModes.length;

			if (isNewItem) {
				// reminderModes = [...reminderModes, { mode, address }];
				reminderModesRune.setModes([...reminderModes, { mode: mode as TMode, address }]);
			} else {
				// reminderModes[i] = { mode, address };
				// reminderModes = [...reminderModes];
				const newItems = reminderModesRune.modes;
				newItems[i] = { mode: mode as TMode, address };
				reminderModesRune.setModes([...newItems]);
			}
			// $formData.reminders = reminderModes;
			$formData.reminders = reminderModesRune.modes;
			isSaved = true;
		}
	};

	const handleDelete = () => {
		const newReminderModes = reminderModesRune.modes;
		newReminderModes.splice(i, 1);
		// reminderModes = [...reminderModes];
		reminderModesRune.setModes([...newReminderModes]);
		// $formData.reminders = reminderModes;
		$formData.reminders = newReminderModes;
	};

	const handleEdit = () => {
		isSaved = false;
	};
</script>

<ListItem {isValid} {isSaved} {handleSave} {handleDelete} {handleEdit}>
	<label>
		Mode
		<select name="mode" class="custom-select" bind:value={mode}>
			<option value="">Select mode</option>
			<option value="email">Email</option>
			<option value="sms">SMS</option>
			<option value="push">Push notification</option>
			<option value="ical">iCalendar event</option>
		</select>
	</label>
	{#if mode}
		{#if mode === 'email'}
			<label>
				Email address
				<input
					name="address"
					class="input-default custom-input"
					type="email"
					bind:value={address}
				/>
			</label>
		{:else if mode === 'sms'}
			<label>
				Phone number
				<input name="address" class="input-default custom-input" type="tel" bind:value={address} />
			</label>
		{:else if mode === 'push'}
			<label>
				Push token
				<input name="address" class="input-default custom-input" type="text" bind:value={address} />
			</label>
		{:else if mode === 'ical'}
			<label>
				iCalendar URL
				<input name="address" class="input-default custom-input" type="url" bind:value={address} />
			</label>
		{/if}
		{#if errorMsg}
			<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
				{errorMsg}
			</p>
		{/if}
	{/if}
</ListItem>
