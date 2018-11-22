import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';
import Location from '../locations/Location';

export default class Ls extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		writeToConsole(
			store
				.getState()
				.location.neighbors.map((location: Location) => location.slug)
				.sort()
				.join('    ')
		);
	}

	command = 'ls';
}
