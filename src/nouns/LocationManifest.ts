import Location from './Location';

import locations from '../data/locations.json';
import neighbors from '../data/neighbors.json';
import items from '../data/items.json';

interface Neighbors {
	from: string;
	to: string;
	oneWay?: boolean;
}

const LocationManifest: { [s: string]: Location } = {};

let hasRun: boolean = false;

export function initializeLocations() {
	if (hasRun) {
		return;
	}

	hasRun = true;

	locations.forEach(location => {
		LocationManifest[location.slug] = new Location(location);
	});

	neighbors.forEach(({ from, to, oneWay }: Neighbors) => {
		if (!LocationManifest[from]) {
			throw `${from} is an invalid location`;
		}

		if (!LocationManifest[to]) {
			throw `${to} is an invalid location`;
		}

		LocationManifest[from].neighborSlugs.push(to);

		if (!oneWay) {
			LocationManifest[to].neighborSlugs.push(from);
		}
	});

	items.forEach(item => {
		if (!LocationManifest[item.locationSlug]) {
			throw `${item.slug} has location ${
				item.locationSlug
			}, which does not exist`;
		}

		LocationManifest[item.locationSlug].itemSlugs.push(item.slug);
	});
}

export default LocationManifest;
