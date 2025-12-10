<script lang="ts">
	import type { TReminderBase } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import TextInput from '../inputs/Text.svelte';
	import Textarea from '../inputs/Textarea.svelte';
	import Date from '../inputs/Date.svelte';
	import { dateTypes, type IInputOption, type TDateType, type TRadiosType } from '$lib/utils/types';
	import Radios from '../inputs/Radios.svelte';
	import FormItemWrapper from './FormItemWrapper.svelte';

	export let superProps: SuperForm<TReminderBase>;
	export let inputType: string | null = null;
	export let options: IInputOption[] | null = null;
	export let inputName: keyof TReminderBase;
	export let label: string;

	const isDateType = (value: string): value is TDateType => dateTypes.includes(value as TDateType);
</script>

<FormItemWrapper {superProps} {inputType} {label} {inputName}>
	{#if inputType === 'text'}
		<TextInput {inputName} {superProps} />
	{:else if inputType === 'textarea'}
		<Textarea {inputName} {superProps} />
	{:else if isDateType(inputName)}
		<Date {superProps} dateFieldName={inputName} />
	{:else if inputType === 'radios' && options}
		<Radios {superProps} {options} inputName={inputName as TRadiosType} />
	{:else}
		<h1>Unsupported input type</h1>
	{/if}
</FormItemWrapper>
