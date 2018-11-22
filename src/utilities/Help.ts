import BaseUtility, { RunParams } from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		writeToConsole(
			`the following utilities are available: ${Object.keys(
				UtilityManifest
			).join(', ')}`
		);
	}

	command = 'help';
}
