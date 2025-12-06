<script lang="ts">
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let inputName: keyof TCreateReminderInput;

	const { form: formData, errors, constraints } = superProps;
</script>

<textarea
	id={inputName}
	name={inputName}
	bind:value={$formData[inputName]}
	class={`${$errors[inputName] ? 'input-error' : 'input-default '} custom-input`}
	rows="3"
	aria-invalid={$errors[inputName] ? 'true' : undefined}
	aria-describedby={inputName}
	{...$constraints[inputName]}
></textarea>
