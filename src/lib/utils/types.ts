import { z } from 'zod/v3';

export interface IInputOption {
	value: any;
	label: string;
}

export const dateTypes = ['date', 'start_date', 'end_date'] as const;
export const radiosTypes = ['is_recurring', 'is_active'] as const;
export const checkboxesTypes = ['location'] as const;
export type TDateType = (typeof dateTypes)[number];
export type TRadiosType = (typeof radiosTypes)[number];
export type TCheckboxesType = (typeof checkboxesTypes)[number];

export const AlertSchema = z.object({
	id: z.string().describe('Unique identifier of the alert'),
	time: z
		.number()
		.min(3000, 'Alert must be at least 3000 milliseconds')
		.describe('Alert time in milliseconds before the reminder')
});

export const AlertUISchema = AlertSchema.extend({
	editable: z
		.boolean()
		.optional()
		.default(false)
		.describe('Indicates if the alert is editable in the UI')
});

export type TAlert = z.infer<typeof AlertSchema>;
export type TAlertUI = z.infer<typeof AlertUISchema>;
