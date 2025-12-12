<script lang="ts">
	import { reminderModesRune } from '$lib/stores/reminders.svelte';
	import { LocationSchema, type TLocation, type TReminderBase } from '$lib/utils/schemas';
	import { AlertSchema, type IInputOption } from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import ListItem from './ListItem.svelte';
	import FormItemWrapper from './FormItemWrapper.svelte';
	import Icon from '@iconify/svelte';
	import { nanoid } from 'nanoid';
	import FormItem from './FormItem.svelte';

	type Props = {
		superProps: SuperForm<TReminderBase>;
	};

	const { superProps }: Props = $props();
	const formData = $derived(superProps.form);
	const errors = $derived(superProps.errors);
	const constraints = $derived(superProps.constraints);

	let currentLocation: TLocation = $state({
		isSet: false,
		details: {
			addressLine1: '',
			addressLine2: '',
			city: '',
			state: '',
			postalCode: '',
			country: ''
		}
	});
	const validationResult = $derived(LocationSchema.safeParse(currentLocation));
	console.log(validationResult);
	let isValid = $derived(validationResult.success);

	let errorMsg = $derived.by(() => {
		console.log('validationResult.error = ', validationResult.error?.issues);
		const issue = validationResult.error?.issues[0];
		return issue?.message;
	});

	const handleSave = () => {
		if (isValid) {
			// $formData.alerts = reminderModesRune.alerts.map((x) => ({ id: x.id, time: x.time }));
			// reminderModesRune.setAlertIsBeingAdded(false);
		}
	};

	const handleDelete = () => {
		// $formData.alerts = reminderModesRune.alerts
		// 	.filter((x) => x.id !== alertId)
		// 	.map((x) => ({ id: x.id, time: x.time }));
		// reminderModesRune.removeAlert(alertId);
		// reminderModesRune.setAlertIsBeingAdded(false);
	};

	const handleEdit = () => {
		// reminderModesRune.setAlertIsBeingAdded(true);
		// reminderModesRune.setAlertEditable(alertId, true);
	};

	const disableDelete = $derived(() => {
		// const alertFromForm = $formData.alerts.find((x) => x.id === alertId);
		// if (alertFromForm && alert.editable) return true;
		// return false;
	});

	const handleOnClick = () => {
		currentLocation = {
			...currentLocation,
			isSet: true
		};
		// reminderModesRune.setAlertIsBeingAdded(true);
		// const newAlert = { time: 86400000, editable: true }; // 24h
		// reminderModesRune.addAlert(newAlert);
		// $formData.alerts = reminderModesRune.alerts
		// 	.filter((x) => x.id !== alertId)
		// 	.map((x) => ({ id: x.id, time: x.time }));
		// reminderModesRune.removeAlert(alertId);
		// reminderModesRune.setAlertIsBeingAdded(false);
	};

	const fieldIsValid = $derived((fieldPath: string) => {
		validationResult.error?.issues.forEach((issue) => {
			if (issue.path.join('.') === fieldPath) {
				console.log('issue.message = ', issue.message);
				return {
					isValid: false,
					errorMsg: issue.message
				};
			}
		});

		return { isValid: true, errorMsg: '' };
	});

	const addressLine1Valid = $derived(fieldIsValid('details.addressLine1').isValid);
</script>

<FormItemWrapper {superProps} label="Set location" inputName="location">
	<!-- <FormItem
		{superProps}
		inputType="checkboxes"
		inputName="location"
		label="Set location"
		options={locationOptions}
	/> -->

	{#if !currentLocation.isSet}
		<p class="mb-3 text-sm italic">No location has been set</p>
	{:else}
		<div class="custom-card bg-white dark:bg-neutral-900">
			<ListItem
				{isValid}
				{handleSave}
				{handleDelete}
				{handleEdit}
				editable={true}
				disableDelete={false}
			>
				<label>
					Address line 1
					<input
						type="text"
						id="addressLine1"
						name="addressLine1"
						disabled={false}
						class={`custom-input ${!addressLine1Valid ? 'input-error' : 'input-default'}`}
						bind:value={currentLocation.details.addressLine1}
					/>
				</label>
				<!-- {#if .errorMsg}
					<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
						{addressLine1Validation.errorMsg}
					</p>
				{/if} -->
				<label>
					Address line 2
					<input
						type="text"
						id="addressLine2"
						name="addressLine2"
						disabled={false}
						class={`custom-input ${!fieldIsValid('details.addressLine2').isValid ? 'input-error' : 'input-default'}`}
						bind:value={currentLocation.details.addressLine2}
					/>
				</label>
				{#if fieldIsValid('details.addressLine2').errorMsg}
					<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
						{fieldIsValid('details.addressLine2').errorMsg}
					</p>
				{/if}
			</ListItem>
		</div>
	{/if}
	{#if !currentLocation.isSet}
		<button
			class="btn-soft flex-important mt-3 justify-self-center"
			type="button"
			onclick={handleOnClick}
			disabled={currentLocation.isSet}
		>
			<Icon icon="fe-plus" />
		</button>
	{/if}
</FormItemWrapper>

<!-- <ListItem
 						bind:value={alert.time}

	{isValid}
	{handleSave}
	{handleDelete}
	{handleEdit}
	editable={alert.editable}
	disableDelete={disableDelete()}
>
	<label>
		Alert in milliseconds
		<input
			name={`alert-${alertId}`}
			class={`custom-input ${!isValid ? 'input-error' : 'input-default'}`}
			type="number"
			disabled={!alert.editable}
			bind:value={alert.time}
		/>
	</label>
	{#if errorMsg}
		<p class="mt-0 text-sm text-red-600" id="hs-validation-name-error-helper">
			{errorMsg}
		</p>
	{/if}
</ListItem> -->
