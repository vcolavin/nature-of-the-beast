import BaseLocation from './BaseLocation';
import ColdCabin from './ColdCabin';

export default class QuietForest extends BaseLocation {
	static description =
		'It is early morning. Cold rain is melting the remaining pieces of ice and snow clinging to the evergreens and you can hear them falling around you. Some of them are large enough to be dangerous, but mostly it is just uncomfortable. Your cotton blouse is not keeping you warm.';

	static neighbors = [ColdCabin];
}
