import BaseLocation from './BaseLocation';
import SomebodyOnceLoved from './SomebodyOnceLoved';
import QuietForest from './QuietForest';
import ColdCabin from './ColdCabin';

const LocationManifest: { [s: string]: typeof BaseLocation } = {
	[SomebodyOnceLoved.slug]: SomebodyOnceLoved,
	[QuietForest.slug]: QuietForest,
	[ColdCabin.slug]: ColdCabin
};

export default LocationManifest;
