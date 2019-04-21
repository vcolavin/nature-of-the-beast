import BaseUtility, { PrivateRunParams } from './BaseUtility';
import ItemManifest from '../nouns/ItemManifest';
import LocationManifest from '../nouns/LocationManifest';

export default class Look extends BaseUtility {
	_run({
		output,
		args,
		state: { location }
	}: PrivateRunParams): Promise<null> {
		if (args.length > 0 && !(args[0] === 'at' && ItemManifest[args[1]])) {
			return output({
				content: `invalid ${this.command} argument ${args.join(' ')}.`
			});
		}

		let descriptions: string[];

		if (args[0] === 'at' && ItemManifest[args[1]]) {
			descriptions = ItemManifest[args[1]].descriptions;
		} else {
			descriptions = LocationManifest[location].descriptions;
		}

		return descriptions.reduce(
			(memo: Promise<null>, text: string): Promise<null> =>
				memo.then(() => output({ content: text, speak: true })),
			Promise.resolve(null)
		);
	}

	command = 'look';
	aliases = ['l'];
	helpDescription = 'Use look to take a good look around.';
}
