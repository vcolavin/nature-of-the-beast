import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { ActionTypes } from '../store';
import LocationManifest from '../nouns/LocationManifest';

export default class Pickup extends BaseUtility {
	protected _run({
		args,
		output,
		state: { location, items },
		dispatch
	}: PrivateRunParams): Promise<null> {
		const item = args[0];
		const currentLocation = LocationManifest[location];

		if (items[item] && currentLocation.hasItem(item)) {
			if (items[item].takeable) {
				currentLocation.itemSlugs = currentLocation.itemSlugs.filter(
					(itemSlug) => itemSlug !== item
				);

				dispatch({
					type: ActionTypes.ADD_TO_INVENTORY,
					value: item
				});

				output({ content: `You have picked up ${item}` });
			} else {
				output({ content: `You cannot pick up ${item}` });
			}
		} else {
			output({ content: `There is no ${item} here` });
		}

		return Promise.resolve(null);
	}

	command = 'get';
	helpDescription =
		'pickup will allow you to add an object to your inventory';
	aliases = ['pickup', 'grab', 'take'];
}
