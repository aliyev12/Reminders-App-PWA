<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		children: any;
		isValid: boolean;
		isSaved: boolean;
		handleSave: () => void;
		handleDelete: () => void;
		handleEdit: () => void;
	};

	const { children, isValid, isSaved, handleDelete, handleEdit, handleSave }: Props = $props();
</script>

<div
	class={`custom-card space-y-2  ${!isSaved ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-neutral-900'} `}
>
	{@render children()}

	<div class="flex space-x-5">
		<button
			disabled={!isValid || isSaved}
			class="btn-soft self-start"
			type="button"
			onclick={handleSave}
		>
			<Icon icon="feather-save" />
		</button>
		<button class="btn-danger self-start" type="button" onclick={handleDelete}>
			<Icon icon="feather-trash" />
		</button>
		{#if isSaved}
			<button class="btn-warn self-start" type="button" onclick={handleEdit}>
				<Icon icon="feather-edit" />
			</button>
		{/if}
	</div>
</div>
