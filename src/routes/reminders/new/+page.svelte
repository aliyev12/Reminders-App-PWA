<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const {
		form: formData,
		errors,
		enhance,
		message,
		submitting,
		constraints
	} = superForm(data.form, {
		taintedMessage: true,
		dataType: 'json'
	});

	let localDateString: string | undefined = $formData.date?.substring(0, 16) ?? undefined;

	$: {
		if (localDateString) {
			const date = new Date(localDateString);
			$formData.date = date.toISOString();
		} else {
			$formData.date = '';
		}
	}

	$: isSubmitting = $submitting;
</script>

<div class="flex flex-col items-center pt-4">
	<h1 class="mb-5 text-3xl">Add a new reminder</h1>

	{#if $message}
		<div
			class="mb-4 rounded-lg p-3 font-semibold text-white"
			class:bg-green-500={$message.includes('Successfully')}
			class:bg-red-500={!$message.includes('Successfully')}
		>
			{$message}
		</div>
	{/if}

	<form method="POST" use:enhance class="w-full space-y-4">
		<div class="max-w-lg">
			<label for="title" class="text-md mb-2 block font-medium">Title</label>
			<div class="relative">
				<input
					type="text"
					id="title"
					name="title"
					class="block w-full rounded-lg border-gray-200 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
					bind:value={$formData.title}
					aria-invalid={$errors.title ? 'true' : undefined}
					aria-describedby="title"
					{...$constraints.title}
				/>
				{#if $errors.title}
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
			{#if $errors.title}
				<p class="mt-2 text-sm text-red-600" id="hs-validation-name-error-helper">
					{$errors.title}
				</p>
			{/if}
		</div>

		<div class="max-w-lg">
			<label for="date" class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300">
				Reminder Date and Time
			</label>
			<div class="relative">
				<input
					type="datetime-local"
					id="date"
					name="date"
					class="block w-full rounded-lg border-gray-200 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
					bind:value={localDateString}
					aria-invalid={$errors.date ? 'true' : undefined}
					aria-describedby="date-error"
					{...$constraints.date}
				/>
			</div>
			{#if $errors.date}
				<p class="mt-2 text-sm text-red-600" id="date-error">
					{$errors.date}
				</p>
			{/if}
		</div>

		<div class="max-w-lg">
			<textarea
				bind:value={$formData.description}
				class="block w-full rounded-lg border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
				rows="3"
			></textarea>
		</div>
		<div class="flex gap-x-6">
			<div class="flex">
				<input
					type="radio"
					name="is_recurring"
					class="mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
					bind:group={$formData.is_recurring}
					value={false}
				/>
				<label for="hs-radio-group-1" class="ms-2 text-sm text-gray-500 dark:text-neutral-400"
					>Single event</label
				>
			</div>

			<div class="flex">
				<input
					type="radio"
					name="is_recurring"
					class="mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
					value={true}
					bind:group={$formData.is_recurring}
				/>
				<label for="hs-radio-group-2" class="ms-2 text-sm text-gray-500 dark:text-neutral-400"
					>Recurring</label
				>
			</div>
		</div>

		<button class="btn-primary" type="submit" disabled={isSubmitting}>
			{#if isSubmitting}
				Submitting
			{:else}
				Create
			{/if}
		</button>
	</form>

	<!-- Optional: Display the internal form state for debugging -->
	<div class="mt-8 border-t border-gray-100 pt-4">
		<h3 class="mb-2 text-lg font-semibold">Form Debugger</h3>
		<SuperDebug data={$formData} />
	</div>
</div>
