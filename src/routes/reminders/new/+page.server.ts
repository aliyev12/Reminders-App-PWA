import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { ReminderBaseSchema } from '$lib/utils/schemas';

export const load = async () => {
	const form = await superValidate(zod(ReminderBaseSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(ReminderBaseSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Successfully created a new reminder!');
	}
};
