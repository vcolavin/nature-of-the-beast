import BaseUtility, { RunParams } from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	run({ writeToConsole, args }: RunParams): Promise<null> {
		if (args.length >= 1) {
			const util = UtilityManifest[args[0]];
			const description = util
				? util.helpDescription
				: `I don't know much about ${args.join(' ')}.`;

			writeToConsole({ item: description });
		} else {
			writeToConsole({
				item: `The following utilities are available: ${Object.keys(
					UtilityManifest
				).join(
					', '
				)}.\n\nFor help with any particular utility, write "help <utility name>".`
			});
		}

		return Promise.resolve(null);
	}

	command = 'help';
	helpDescription = 'Use help to make sense of the world.';
}
