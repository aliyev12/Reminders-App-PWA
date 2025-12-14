<script lang="ts">
	import type { TReminderBase } from '$lib/utils/schemas';
	import {
		dateTypes,
		type IInputOption,
		type TCheckboxesType,
		type TDateType,
		type TRadiosType
	} from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import Checkboxes from '../inputs/Checkboxes.svelte';
	import Date from '../inputs/Date.svelte';
	import Radios from '../inputs/Radios.svelte';
	import TextInput from '../inputs/Text.svelte';
	import Textarea from '../inputs/Textarea.svelte';
	import FormItemWrapper from './FormItemWrapper.svelte';

	type Props = {
		isRequired?: boolean;
		superProps: SuperForm<TReminderBase>;
		inputType?: string;
		inputName: keyof TReminderBase;
		label: string;
		options?: IInputOption[] | null;
	};

	const { isRequired = false, superProps, inputType, inputName, label, options }: Props = $props();
	const isDateType = (value: string): value is TDateType => dateTypes.includes(value as TDateType);
</script>

<FormItemWrapper {superProps} {inputType} {label} {inputName} {isRequired}>
	{#if inputType === 'text'}
		<TextInput inputName="title" {superProps} />
	{:else if inputType === 'textarea'}
		<Textarea {inputName} {superProps} />
	{:else if isDateType(inputName)}
		<Date {superProps} dateFieldName={inputName} />
	{:else if inputType === 'radios' && options}
		<Radios {superProps} {options} inputName={inputName as TRadiosType} />
	{:else if inputType === 'checkboxes' && options}
		<Checkboxes {superProps} {options} inputName={inputName as TCheckboxesType} />
	{:else}
		<h1>Unsupported input type</h1>
	{/if}
</FormItemWrapper>
