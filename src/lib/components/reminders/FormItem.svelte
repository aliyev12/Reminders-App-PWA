<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';
	import TextInput from '../inputs/Text.svelte';
	import Textarea from '../inputs/Textarea.svelte';
	import Date from '../inputs/Date.svelte';
	import { dateTypes, type IInputOption, type TDateType, type TRadiosType } from '$lib/utils/types';
	import Radios from '../inputs/Radios.svelte';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let inputType: string | null = null;
	export let options: IInputOption[] | null = null;
	export let inputName: keyof TCreateReminderInput;
	export let label: string;

	const { form: formData, errors, enhance, message, submitting, constraints } = superProps;
	const isDateType = (value: string): value is TDateType => dateTypes.includes(value as TDateType);
</script>

<div class="max-w-lg">
	<label for="title" class="text-md mb-2 block font-medium">{label}</label>
	<div class="relative">
		{#if inputType === 'text'}
			<TextInput {inputName} {superProps} />
		{:else if inputType === 'textarea'}
			<Textarea {inputName} {superProps} />
		{:else if isDateType(inputName)}
			<Date {superProps} dateFieldName={inputName} />
		{:else if inputType === 'radios' && options}
			<Radios {superProps} {options} inputName={inputName as TRadiosType} />
		{/if}

		{#if $errors[inputName]}
			<div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
				<svg
					class="size-4 shrink-0 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" x2="12" y1="8" y2="12"></line>
					<line x1="12" x2="12.01" y1="16" y2="16"></line>
				</svg>
			</div>
		{/if}
	</div>
	{#if $errors[inputName]}
		<p class="mt-2 text-sm text-red-600" id="hs-validation-name-error-helper">
			{$errors[inputName]}
		</p>
	{/if}
</div>
