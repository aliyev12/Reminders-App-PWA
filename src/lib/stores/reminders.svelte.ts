import type { TReminderMode, TReminderModeUI } from '$lib/utils/schemas';
import type { TAlertUI } from '$lib/utils/types';

export class ReminderModesStore {
	private currentModes = $state<TReminderModeUI[]>([]);
	private currentAlerts = $state<TAlertUI[]>([]);
	private currentAlertIsBeingAdded = $state(false);
	private currentModeIsBeingAdded = $state(false);

	// MODES
	get modes() {
		return this.currentModes;
	}

	get modeIsBeingAdded() {
		return this.currentModeIsBeingAdded;
	}

	setModes(newModes: TReminderModeUI[]) {
		newModes = newModes.map((mode) => ({ ...mode, editable: mode.editable ?? false }));
		this.currentModes = newModes;
	}

	getModeById(modeId: string): TReminderModeUI {
		const foundMode = this.currentModes.find((mode) => mode.id === modeId);
		if (!foundMode) throw new Error(`Mode with id ${modeId} not found`);
		return foundMode;
	}

	addMode(newMode: TReminderModeUI) {
		this.currentModes = [...this.currentModes, newMode];
	}

	removeMode(modeId: string) {
		this.currentModes = this.currentModes.filter((mode) => mode.id !== modeId);
	}

	setModeIsBeingAdded(value: boolean) {
		this.currentModeIsBeingAdded = value;
	}

	setModeEditable(modeId: string, editable: boolean) {
		const modeIndex = this.currentModes.findIndex((mode) => mode.id === modeId);

		if (modeIndex === -1) throw new Error(`Mode with id ${modeId} not found`);

		const updatedMode = { ...this.currentModes[modeIndex], editable };
		this.currentModes = [
			...this.currentModes.slice(0, modeIndex),
			updatedMode,
			...this.currentModes.slice(modeIndex + 1)
		];
	}

	// ALERTS
	get alerts() {
		return this.currentAlerts;
	}

	get alertIsBeingAdded() {
		return this.currentAlertIsBeingAdded;
	}

	getAlertById(alertId: string): TAlertUI {
		const foundAlert = this.currentAlerts.find((alert) => alert.id === alertId);
		if (!foundAlert) throw new Error(`Alert with id ${alertId} not found`);
		return foundAlert;
	}

	setAlerts(newAlerts: TAlertUI[]) {
		newAlerts = newAlerts.map((alert) => ({ ...alert, editable: alert.editable ?? false }));
		this.currentAlerts = newAlerts;
	}

	addAlert(newAlert: TAlertUI) {
		this.currentAlerts = [...this.currentAlerts, newAlert];
	}

	removeAlert(alertId: string) {
		this.currentAlerts = this.currentAlerts.filter((x) => x.id !== alertId);
	}

	setAlertIsBeingAdded(value: boolean) {
		this.currentAlertIsBeingAdded = value;
	}

	setAlertEditable(alertId: string, editable: boolean) {
		const alertIndex = this.currentAlerts.findIndex((alert) => alert.id === alertId);

		if (alertIndex === -1) throw new Error(`Alert with id ${alertId} not found`);

		const updatedAlert = { ...this.currentAlerts[alertIndex], editable };
		this.currentAlerts = [
			...this.currentAlerts.slice(0, alertIndex),
			updatedAlert,
			...this.currentAlerts.slice(alertIndex + 1)
		];
	}
}

export const reminderModesRune = new ReminderModesStore();
