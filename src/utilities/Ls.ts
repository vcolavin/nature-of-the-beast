import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';

export default class Ls extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		writeToConsole(
			store
				.getState()
				.location.neighbors.map(location => location.slug)
				.sort()
				.join('    ')
		);
	}

	command = 'ls';
}
