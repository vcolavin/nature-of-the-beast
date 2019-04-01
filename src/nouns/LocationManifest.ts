import Location from './Location';

import locations from '../data/locations.json';
import neighbors from '../data/neighbors.json';
import items from '../data/items.json';

export const loading = new Location({
	slug: 'loading',
	descriptions: ['loading']
});

const LocationManifest: { [s: string]: Location } = {
	loading
};

let hasRun: boolean = false;

export function initializeLocations() {
	if (hasRun) {
		return;
	}

	hasRun = true;

	locations.forEach(location => {
		LocationManifest[location.slug] = new Location(location);
	});

	neighbors.forEach(neighborPair => {
		if (!LocationManifest[neighborPair[0]]) {
			throw `${neighborPair[0]} is an invalid location`;
		}

		if (!LocationManifest[neighborPair[1]]) {
			throw `${neighborPair[1]} is an invalid location`;
		}

		LocationManifest[neighborPair[0]].neighborSlugs.push(neighborPair[1]);
		LocationManifest[neighborPair[1]].neighborSlugs.push(neighborPair[0]);
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
