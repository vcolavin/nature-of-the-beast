import BaseLocation from './BaseLocation';
import SomebodyOnceLoved from './SomebodyOnceLoved';
import QuietForest from './QuietForest';
import ColdCabin from './ColdCabin';

const locations = [SomebodyOnceLoved, QuietForest, ColdCabin];

const LocationManifest: { [s: string]: BaseLocation } = {};

locations.forEach(location => {
	LocationManifest[location.slug] = location;
});

export default LocationManifest;
