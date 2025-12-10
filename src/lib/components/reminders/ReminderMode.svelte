<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import type { TReminderBase } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import isMobilePhone from 'validator/lib/isMobilePhone';
	import { z } from 'zod/v3';
	import ListItem from './ListItem.svelte';

	type Props = {
		superProps: SuperForm<TReminderBase>;
		modeId: string;
	};

	const { superProps, modeId }: Props = $props();
	const formData = $derived(superProps.form);
	const mode = $derived(reminderModesRune.getModeById(modeId));

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

	const validationResult = $derived(
		ReminderModeInputSchema.safeParse({ mode: mode.mode, address: mode.address })
	);
	let isValid = $derived(validationResult.success);

	let errorMsg = $derived.by(() => {
		const issue = validationResult.error?.issues[0];
		if (issue?.path[0] === 'address') {
			return issue.message;
		} else {
			return '';
		}
	});

	const handleSave = () => {
		if (isValid) {
			$formData.reminders = reminderModesRune.modes.map((x) => ({
				id: x.id,
				mode: x.mode,
				address: x.address
			}));
			reminderModesRune.setModeIsBeingAdded(false);
		}
	};

	const handleDelete = () => {
		$formData.reminders = reminderModesRune.modes
			.filter((x) => x.id !== modeId)
			.map((x) => ({ id: x.id, mode: x.mode, address: x.address }));
		reminderModesRune.removeMode(modeId);
		reminderModesRune.setModeIsBeingAdded(false);
	};

	const handleEdit = () => {
		reminderModesRune.setModeIsBeingAdded(true);
		reminderModesRune.setModeEditable(modeId, true);
	};

	const disableDelete = $derived(() => {
		const modeFromForm = $formData.reminders.find((x) => x.id === modeId);
		if (modeFromForm && mode.editable) return true;
		return false;
	});
</script>

<ListItem
	{isValid}
	{handleSave}
	{handleDelete}
	{handleEdit}
	editable={mode.editable}
	disableDelete={disableDelete()}
>
	<label>
		Mode
		<select name="mode" class="custom-select" bind:value={mode.mode} disabled={!mode.editable}>
			<option value="">Select mode</option>
			<option value="email">Email</option>
			<option value="sms">SMS</option>
			<option value="push">Push notification</option>
			<option value="ical">iCalendar event</option>
		</select>
	</label>
	{#if mode.mode}
		{#if mode.mode === 'email'}
			<label>
				Email address
				<input
					disabled={!mode.editable}
					name="address"
					class="input-default custom-input"
					type="email"
					bind:value={mode.address}
				/>
			</label>
		{:else if mode.mode === 'sms'}
			<label>
				Phone number
				<input
					disabled={!mode.editable}
					name="address"
					class="input-default custom-input"
					type="tel"
					bind:value={mode.address}
				/>
			</label>
		{:else if mode.mode === 'push'}
			<label>
				Push token
				<input
					disabled={!mode.editable}
					name="address"
					class="input-default custom-input"
					type="text"
					bind:value={mode.address}
				/>
			</label>
		{:else if mode.mode === 'ical'}
			<label>
				iCalendar URL
				<input
					disabled={!mode.editable}
					name="address"
					class="input-default custom-input"
					type="url"
					bind:value={mode.address}
				/>
			</label>
		{/if}
		{#if errorMsg}
			<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
				{errorMsg}
			</p>
		{/if}
	{/if}
</ListItem>
