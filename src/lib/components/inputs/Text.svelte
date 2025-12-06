<script lang="ts">
	import type { TCreateReminderInput } from '$lib/utils/schemas';
	import type { SuperForm } from 'sveltekit-superforms';

	export let superProps: SuperForm<TCreateReminderInput>;
	export let inputName: keyof TCreateReminderInput;

	const { form: formData, errors, constraints } = superProps;
</script>

<input
	type="text"
	id={inputName}
	name={inputName}
	class={`${$errors[inputName] ? 'input-error' : 'input-default '} custom-input`}
	bind:value={$formData[inputName]}
	aria-invalid={$errors[inputName] ? 'true' : undefined}
	aria-describedby={inputName}
	{...$constraints[inputName]}
/>
