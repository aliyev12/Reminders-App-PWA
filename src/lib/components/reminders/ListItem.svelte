<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		children: any;
		isValid: boolean;
		editable?: boolean;
		disableDelete?: boolean;
		handleSave: () => void;
		handleDelete: () => void;
		handleEdit: () => void;
	};

	const {
		children,
		isValid,
		editable = false,
		disableDelete = false,
		handleDelete,
		handleEdit,
		handleSave
	}: Props = $props();
</script>

<div
	class={`custom-card space-y-2  ${editable ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-neutral-900'} `}
>
	{@render children()}

	<div class="flex justify-center space-x-5">
		<button
			disabled={!isValid || !editable}
			class="btn-soft self-start"
			type="button"
			onclick={handleSave}
		>
			<Icon icon="feather-save" />
		</button>
		<button
			class="btn-danger self-start"
			type="button"
			onclick={handleDelete}
			disabled={disableDelete}
		>
			<Icon icon="feather-trash" />
		</button>
		<button class="btn-warn self-start" type="button" onclick={handleEdit} disabled={editable}>
			<Icon icon="feather-edit" />
		</button>
	</div>
</div>
