import BaseLocation from './locations/BaseLocation';
import LocationManifest from './locations/LocationManifest';

interface BigStateObject {
	location: BaseLocation;
}

export default function getState(): BigStateObject {
	return {
		location: LocationManifest['a_quiet_forest']
	};
}
