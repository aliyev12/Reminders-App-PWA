<script lang="ts">
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let dateFieldName: 'date' | 'start_date' | 'end_date';

	const { form: formData, errors, constraints } = superProps;

	let localDateString: string | undefined = $formData[dateFieldName]?.substring(0, 16) ?? undefined;

	$: {
		if (localDateString) {
			const date = new Date(localDateString);
			$formData[dateFieldName] = date.toISOString();
		} else {
			$formData[dateFieldName] = '';
		}
	}
</script>

<input
	type="datetime-local"
	id={dateFieldName}
	name={dateFieldName}
	class={`${$errors[dateFieldName] ? 'input-error' : 'input-default '} custom-input`}
	bind:value={localDateString}
	aria-invalid={$errors[dateFieldName] ? 'true' : undefined}
	aria-describedby={`${dateFieldName}-error`}
	{...$constraints[dateFieldName]}
/>
