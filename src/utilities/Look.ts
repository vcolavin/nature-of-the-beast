import BaseUtility, { PrivateRunParams } from './BaseUtility';
import ItemManifest from '../nouns/ItemManifest';
import LocationManifest from '../nouns/LocationManifest';
import { RootState } from '../store';

export default class Look extends BaseUtility {
	protected _run({
		output,
		args,
		state: { location }
	}: PrivateRunParams): Promise<null> {
		let descriptions: string[];

		if (ItemManifest[args[0]]) {
			descriptions = ItemManifest[args[0]].descriptions;
		} else {
			descriptions = LocationManifest[location].descriptions;
		}

		return descriptions.reduce(
			(memo: Promise<null>, text: string): Promise<null> =>
				memo.then(() => output({ content: text, speak: true })),
			Promise.resolve(null)
		);
	}

	getTabCompleteOptions = ({ location }: RootState, args: string): string[] =>
		LocationManifest[location].itemSlugs.filter(
			(slug: string) => slug.indexOf(args) === 0
		);

	command = 'look';
	aliases = ['l'];
	helpDescription = 'Use look to take a good look around.';
}
