import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';
import ItemManifest from '../nouns/ItemManifest';
import { Description } from '../nouns/Location';

export default class Look extends BaseUtility {
	run({ writeToConsole, args }: RunParams): Promise<null> {
		if (args[0] === 'at' && ItemManifest[args[1]]) {
			return writeToConsole({
				item: ItemManifest[args[1]].description,
				speak: true
			});
		}

		if (args.length > 0) {
			return writeToConsole({
				item: `invalid ${this.command} argument ${args.join(' ')}.`
			});
		}

		return getCurrentLocation().descriptions.reduce(
			(memo: Promise<null>, { text }: Description): Promise<null> =>
				memo.then(() => writeToConsole({ item: text, speak: true })),
			Promise.resolve(null)
		);
	}

	command = 'look';
	helpDescription =
		'Use look to take some time, to see where you are. Some things take longer to see than others.';
}
