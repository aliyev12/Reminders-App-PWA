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
		console.log('Sending request to backend', import.meta.env.VITE_APP_API_KEY);
		const response = await fetch(`${import.meta.env.VITE_REMINDERS_BACKEND_URL}/reminders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': import.meta.env.VITE_APP_API_KEY
			},
			body: JSON.stringify(form.data)
		});

		console.log('Response status:', response.status);

		if (!response.ok) {
			return fail(response.status, { form });
		}

		const responseData = await response.json();

		console.log('Response data:', responseData);

		return message(form, 'Successfully created a new reminder!');
	}
};
