import BaseUtility from './BaseUtility';

export default class Ls extends BaseUtility {
	static run(_args: string[], writeToConsole): void {
		writeToConsole(
			'a_cold_cabin     a_quiet_forest     someone_somebody_once_loved'
		);
	}
}
