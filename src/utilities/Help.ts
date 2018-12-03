import BaseUtility, { RunParams } from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole(
			`The following utilities are available: ${Object.keys(
				UtilityManifest
			).join(
				', '
			)}.\n\nFor help with any particular utility, write "help <utility name>".`
		);
		return Promise.resolve(null);
	}

	command = 'help';
	helpDescription = 'Use help to make sense of the world.';
}
