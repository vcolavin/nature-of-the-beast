import Location from './Location';

import locations from '../data/locations.json';
import neighbors from '../data/neighbors.json';

export const loading = new Location({
	slug: 'loading',
	descriptions: [{ text: 'loading' }]
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
		LocationManifest[neighborPair[0]].neighborSlugs.push(neighborPair[1]);

		LocationManifest[neighborPair[1]].neighborSlugs.push(neighborPair[0]);
	});
}

export default LocationManifest;
