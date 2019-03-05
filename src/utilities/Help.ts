import BaseUtility, { PrivateRunParams } from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	_run({ output, args }: PrivateRunParams): Promise<null> {
		if (args.length >= 1) {
			const util = UtilityManifest[args[0]];
			const description = util
				? util.helpDescription
				: `I don't know much about ${args.join(' ')}.`;

			output({ content: description });
		} else {
			output({
				content: `The following utilities are available: ${Object.keys(
					UtilityManifest
				).join(
					', '
				)}.\n\nFor help with any particular utility, write "help <utility name>".\n\nTo stop a dialogue, hit escape or ctrl+c`
			});
		}

		return Promise.resolve(null);
	}

	command = 'help';
	helpDescription = 'Use help to make sense of the world.';
}
