<script lang="ts">
	import Icon from '@iconify/svelte';
	import { z } from 'zod/v3';
	import isMobilePhone from 'validator/lib/isMobilePhone';
	import type { TCreateReminderInput, TReminderMode } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let reminderMode: TReminderMode;
	export let i: number;
	export let reminderModes: TReminderMode[];

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

	let mode: TMode;
	let address: string = '';
	let isValid = false;

	const handleSave = () => {
		if (isValid) {
			const existingItem = reminderModes[i];

			if (!existingItem) {
				reminderModes = [...reminderModes, { mode, address }];
			} else {
				reminderModes[i] = { mode, address };
				reminderModes = [...reminderModes];
			}
			$formData.reminders = reminderModes;
		}
	};

	const handleDelete = () => {
		reminderModes.splice(i, 1);
		reminderModes = [...reminderModes];
		$formData.reminders = reminderModes;
	};

	let errorMsg: string = '';
	let isSaved = false;

	const handleEdit = () => {
		isSaved = false;
	};

	$: {
		isValid = ReminderModeInputSchema.safeParse({ mode, address }).success;

		const issue = ReminderModeInputSchema.safeParse({ mode, address }).error?.issues[0];
		if (issue?.path[0] === 'address') {
			errorMsg = issue.message;
		} else {
			errorMsg = '';
		}

		isSaved = $formData.reminders.some((x) => x.mode === mode && x.address === address);
	}
</script>

<div class={`custom-card space-y-2  ${!isSaved ? 'bg-green-100' : 'bg-white'} `}>
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

	<div class="flex space-x-5">
		<button
			disabled={!isValid || isSaved}
			class="btn-soft self-start"
			type="button"
			on:click={handleSave}
		>
			<Icon icon="feather-save" />
		</button>
		<button class="btn-danger self-start" type="button" on:click={handleDelete}>
			<Icon icon="feather-trash" />
		</button>
		{#if isSaved}
			<button class="btn-warn self-start" type="button" on:click={handleEdit}>
				<Icon icon="feather-edit" />
			</button>
		{/if}
	</div>
</div>
