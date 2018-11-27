import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';
import { TAB_WIDTH } from '../components/Terminal';

export default class Ls extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole(
			getCurrentLocation()
				.neighborSlugs.sort()
				.join(TAB_WIDTH)
		);

		return Promise.resolve(null);
	}

	command = 'ls';
}
