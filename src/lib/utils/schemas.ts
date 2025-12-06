import { z } from 'zod/v3';
import { DEFAULT_EMAIL } from '$env/static/private';

const defaultEmailAddress = DEFAULT_EMAIL;

const ReminderModeSchema = z.object({
	mode: z.string().describe('Mode of contact'),
	address: z.string().describe('Contact address')
});

const LocationSchema = z.object({
	addressLine1: z
		.string()
		.min(1, 'Address Line 1 is required')
		.describe('First line of the address'),
	addressLine2: z.string().optional().describe('Second line of the address'),
	city: z.string().min(1, 'City is required').describe('City of the address'),
	state: z.string().min(1, 'State is required').describe('State of the address'),
	postalCode: z.string().min(1, 'Postal Code is required').describe('Postal code of the address'),
	country: z.string().min(1, 'Country is required').describe('Country of the address')
});

export const ReminderBaseSchema = z.object({
	title: z
		.string()
		.min(3, 'Title is required')
		.email('must be an email...')
		.describe('Title of the reminder'),
	date: z
		.string()
		.describe(
			'Date of the reminder, it has to be using UTC format, for example: 2025-11-29T03:03:53Z'
		),
	location: z.string().nullable().optional().default(null).describe('Location of the reminder'),
	description: z.string().describe('Description of the reminder'),
	reminders: z
		.array(ReminderModeSchema)
		.default([
			{
				mode: 'email',
				address: defaultEmailAddress!
			}
		])
		.describe('List of contact modes to use for the reminder'),
	alerts: z
		.array(z.number())
		.default([1000])
		.describe('List of alert times in milliseconds before the reminder'),
	is_recurring: z
		.boolean()
		// .default(false)
		.optional()
		.describe('Indicates if the reminder is recurring'),
	recurrence: z
		.string()
		.nullable()
		.optional()
		.default(null)
		.describe('Recurrence pattern of the reminder as a cron expression'),
	start_date: z
		.string()
		.nullable()
		.optional()
		.default(null)
		.describe('Start date of the recurrence in ISO format'),
	end_date: z
		.string()
		.nullable()
		.optional()
		.default(null)
		.describe('End date of the recurrence in ISO format'),
	is_active: z.boolean().optional().describe('Indicates if the reminder is active')
});

export const ReminderSchema = ReminderBaseSchema.extend({
	id: z.number().describe('Unique identifier of the reminder'),
	last_alert_time: z.any().nullable().describe('Last alert time in ISO format')
});

export const RemindersSchema = z.array(ReminderSchema).describe('An array of reminder objects.');

export type TReminder = z.infer<typeof ReminderSchema>;

export type TReminderMode = z.infer<typeof ReminderModeSchema>;

export const RemindersOutputSchema = z
	.object({
		result: RemindersSchema.optional(),
		error: z.string().optional()
	})
	.describe('An array of active reminder objects.');

export type TRemindersOutput = z.infer<typeof RemindersOutputSchema>;

export const ReminderOutputSchema = z
	.object({
		result: ReminderSchema.optional(),
		error: z.string().optional()
	})
	.describe('An array of active reminder objects.');

export type TReminderOutput = z.infer<typeof ReminderOutputSchema>;

export const CreateReminderInputSchema = ReminderBaseSchema.extend({});

export const DeleteReminderOutputSchema = z.object({
	status: z.string().describe('Status of the delete operation'),
	error: z.string().optional().describe('Error message if the delete operation failed'),
	deletedReminder: ReminderSchema.optional().describe('The reminder that was deleted')
});

export type TDeleteReminderOutput = z.infer<typeof DeleteReminderOutputSchema>;

export const UpdateReminderInputSchema = ReminderBaseSchema.extend({
	id: z.number().describe('Unique identifier of the reminder')
});

export type TCreateReminderInput = z.infer<typeof CreateReminderInputSchema>;
export type TUpdateReminderInput = z.infer<typeof UpdateReminderInputSchema>;
