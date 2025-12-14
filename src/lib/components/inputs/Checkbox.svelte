<script lang="ts">
	import type { TReminderBase } from '$lib/utils/schemas';
	import type { IInputOption, TCheckboxesType } from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TReminderBase>;
	export let options: IInputOption[] | null = null;
	export let inputName: TCheckboxesType;

	const { form: formData, errors, constraints } = superProps;
</script>

<input
	id={inputName}
	name={inputName}
	type="checkbox"
	checked={option.value === $formData[inputName]}
	class="mt-0.5 shrink-0 rounded-sm border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
	aria-describedby={inputName}
	{...$constraints[inputName]}
	bind:group={$formData[inputName]}
/>
