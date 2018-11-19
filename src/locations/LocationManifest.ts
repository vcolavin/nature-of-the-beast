import BaseLocation from './BaseLocation';
import SomebodyOnceLoved from './SomebodyOnceLoved';
import QuietForest from './QuietForest';
import ColdCabin from './ColdCabin';

const LocationManifest: { [s: string]: typeof BaseLocation } = {
	someone_somebody_once_loved: SomebodyOnceLoved,
	a_quiet_forest: QuietForest,
	a_cold_cabin: ColdCabin
};

export default LocationManifest;
