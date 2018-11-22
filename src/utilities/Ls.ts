import BaseUtility from './BaseUtility';
import getState from '../BigStateObject';

export default class Ls extends BaseUtility {
	run(_args: string[], writeToConsole): void {
		writeToConsole(
			getState()
				.location.neighbors.map(location => location.slug)
				.sort()
				.join('    ')
		);
	}

	command = 'ls';
}
