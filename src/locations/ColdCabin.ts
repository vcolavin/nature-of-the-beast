import BaseLocation from './BaseLocation';
import QuietForest from './QuietForest';
import SomebodyOnceLoved from './SomebodyOnceLoved';

export default class ColdCabin extends BaseLocation {
	static description = 'it is a cold cabin';

	static neighbors = [QuietForest, SomebodyOnceLoved];
}
