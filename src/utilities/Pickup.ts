import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes, getCurrentLocation } from '../store';
import ItemManifest from '../nouns/ItemManifest';

export default class Pickup extends BaseUtility {
	_run({ args, output }: PrivateRunParams): Promise<null> {
		const item = args[0];

		if (
			ItemManifest[item] &&
			getCurrentLocation().itemSlugs.indexOf(item) > -1
		) {
			if (ItemManifest[item].takeable) {
				getCurrentLocation().itemSlugs = getCurrentLocation().itemSlugs.filter(
					itemSlug => itemSlug !== item
				);

				store.dispatch({
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

	command = 'pickup';
	helpDescription =
		'pickup will allow you to add an object to your inventory';
}
