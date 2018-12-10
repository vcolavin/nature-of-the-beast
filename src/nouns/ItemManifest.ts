import Item from './Item';
import items from '../data/items.json';

const ItemManifest: { [s: string]: Item } = {};

let hasRun: boolean = false;

export function initializeItems() {
	if (hasRun) {
		return;
	}

	hasRun = true;

	items.forEach(item => {
		ItemManifest[item.slug] = new Item(item);
	});
}

export default ItemManifest;
