import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { UtilityManifest, ExtendedUtilityManifest } from './UtilityManifest';

export default class Help extends BaseUtility {
	protected _run({ output, args }: PrivateRunParams): Promise<null> {
		if (args.length >= 1) {
			const util = ExtendedUtilityManifest[args[0]];
			const description = util
				? `${util.helpDescription}${
						util.aliases.length > 0
							? `\nAliases for this command are: ${[
									util.command,
									...util.aliases
							  ].join(', ')}.`
							: ''
				  }`
				: `I don't know about ${args.join(' ')}.`;

			output({ content: description });
		} else {
			output({
				content: `You can interact with the story by typing a verb, optionally followed by some details.\nFor example, type 'look' to observe where you are. Type 'look thing' to take a closer look at that thing.\nThe following verbs are available: ${Object.keys(
					UtilityManifest
				).join(
					', '
				)}.\n\nTo get more details for a verb, type e.g., "help look". This will also show you available aliases for that verb.\n\nTo stop a dialogue, press the escape key.`
			});
		}

		return Promise.resolve(null);
	}

	command = 'help';
	helpDescription = 'Use help to make sense of the world.';
}
