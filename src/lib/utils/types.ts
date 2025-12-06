export interface IInputOption {
	value: any;
	label: string;
}

export const dateTypes = ['date', 'start_date', 'end_date'] as const;
export const radiosTypes = ['is_recurring', 'is_active'] as const;
export type TDateType = (typeof dateTypes)[number];
export type TRadiosType = (typeof radiosTypes)[number];
