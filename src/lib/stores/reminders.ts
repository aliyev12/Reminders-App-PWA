import type { TReminderMode } from '$lib/utils/schemas';

export class ReminderModesStore {
	private currentModes = $state<TReminderMode[]>([]);

	get modes() {
		return this.currentModes;
	}

	setModes(newModes: TReminderMode[]) {
		this.currentModes = newModes;
	}
}

export const reminderModesRune = new ReminderModesStore();
