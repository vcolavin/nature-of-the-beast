import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';
import Location from '../locations/Location';
import { TAB_WIDTH } from '../components/Terminal';

export default class Ls extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		writeToConsole(
			getCurrentLocation()
				.neighbors.map((location: Location) => location.slug)
				.sort()
				.join(TAB_WIDTH)
		);
	}

	command = 'ls';
}
