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
				content: this.helpMessage
			});
		}

		return Promise.resolve(null);
	}

	command = 'help';
	helpDescription = 'Use help to make sense of the world.';

	helpMessage = `\
The Nature of the Beast
A work of interactive fiction by Vincent Colavin.

Content warning: This story depicts an emotionally abusive parent-child relationship. Descriptions are spoken out loud by your browser by default. Type "mute" to toggle the audio.

Here are some basic commands:
- List nearby places and objects by typing "list". Places are green, and items are blue.
- Observe your current location by typing "look".
- Examine an object by typing "look at <object>".
- Travel to a location by typing "go <location>".
- Attempt to pick up an object by typing "pickup <object>".
- To view this message at any time, type "help".

The complete list of available commands is: ${Object.keys(UtilityManifest).join(
		', '
	)}.

To get more details for a command, type "help <command>".
`;
}
