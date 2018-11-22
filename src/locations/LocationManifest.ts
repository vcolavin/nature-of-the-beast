import Location from './Location';

import locations from '../data/locations.json';
import neighbors from '../data/neighbors.json';

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

	neighbors.forEach(neighborPair => {
		LocationManifest[neighborPair[0]].neighbors.push(
			LocationManifest[neighborPair[1]]
		);

		LocationManifest[neighborPair[1]].neighbors.push(
			LocationManifest[neighborPair[0]]
		);
	});
}

export default LocationManifest;
