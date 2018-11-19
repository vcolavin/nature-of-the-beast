import BaseLocation from './BaseLocation';
import SomebodyOnceLoved from './SomebodyOnceLoved';
import QuietForest from './QuietForest';
import ColdCabin from './ColdCabin';

const LocationManifest: { [s: string]: typeof BaseLocation } = {
	[SomebodyOnceLoved.title]: SomebodyOnceLoved,
	[QuietForest.title]: QuietForest,
	[ColdCabin.title]: ColdCabin
};

export default LocationManifest;
