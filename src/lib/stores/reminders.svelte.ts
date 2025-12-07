import type { TReminderMode } from '$lib/utils/schemas';

export class ReminderModesStore {
	private currentModes = $state<TReminderMode[]>([]);
	private currentAlerts = $state<number[]>([]);

	get modes() {
		return this.currentModes;
	}

	get alerts() {
		return this.currentAlerts;
	}

	setModes(newModes: TReminderMode[]) {
		this.currentModes = newModes;
	}

	setAlerts(newAlerts: number[]) {
		this.currentAlerts = newAlerts;
	}
}

export const reminderModesRune = new ReminderModesStore();
