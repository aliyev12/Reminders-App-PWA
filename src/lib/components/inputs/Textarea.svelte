<script lang="ts">
	import type { TReminderBase } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TReminderBase>;
	export let inputName: keyof TReminderBase;

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
