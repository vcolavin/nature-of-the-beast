import Item from './Item';
import items from '../data/items.json';
import { ItemManifest } from '../store';

let hasRun: boolean = false;

export function initializeItems(): ItemManifest {
	if (hasRun) {
		return {};
	}

	hasRun = true;

	const manifest: ItemManifest = {};

	items.forEach((item) => {
		manifest[item.slug] = new Item(item);
	});

	return manifest;
}
