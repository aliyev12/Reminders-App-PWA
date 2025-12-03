import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { CreateReminderInputSchema } from '$lib/utils/schemas';

export const load = async () => {
	const form = await superValidate(zod(CreateReminderInputSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(CreateReminderInputSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { title } = form.data;
		console.log('title = ', title);

		console.log(form);
		return message(form, 'Successfully created a new reminder!');
	}
};
