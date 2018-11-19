import BaseLocation from './BaseLocation';
import ColdCabin from './ColdCabin';

export default class SomebodyOnceLoved extends BaseLocation {
	static description =
		'Someone somebody once loved, probably, is sitting at an old kitchen table. They are an adult, but beyond that you struggle to make out anything about them. The stench is magnificent.';

	static neighbors = [ColdCabin];

	static slug = 'somebody_once_loved';
}
