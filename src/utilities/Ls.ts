import BaseUtility from './BaseUtility';
import store from '../store';

export default class Ls extends BaseUtility {
	run(_args: string[], writeToConsole): void {
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
