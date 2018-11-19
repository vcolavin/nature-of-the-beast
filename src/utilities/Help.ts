import BaseUtility from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	run(_args: string[], writeToConsole): void {
		writeToConsole(
			`the following utilities are available: ${Object.keys(
				UtilityManifest
			).join(', ')}`
		);
	}

	command = 'help';
}
