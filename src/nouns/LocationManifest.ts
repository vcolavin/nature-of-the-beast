import Location from './Location';

import locations from '../data/locations.json';
import neighbors from '../data/neighbors.json';
import items from '../data/items.json';

interface NeighborOptions {
	oneWay: boolean;
}
type Neighbors = [string, string, NeighborOptions];

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

	(neighbors as Neighbors[]).forEach((neighbors: Neighbors) => {
		const [neighbor1, neighbor2, { oneWay }] = neighbors;

		if (!LocationManifest[neighbor1]) {
			throw `${neighbor1} is an invalid location`;
		}

		if (!LocationManifest[neighbor2]) {
			throw `${neighbor2} is an invalid location`;
		}

		LocationManifest[neighbor1].neighborSlugs.push(neighbor2);

		if (!oneWay) {
			LocationManifest[neighbor2].neighborSlugs.push(neighbor1);
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
