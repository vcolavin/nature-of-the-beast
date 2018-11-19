import BaseUtility from './BaseUtility';
import BigStateObject from '../BigStateObject';

export default class Ls extends BaseUtility {
	static run(_args: string[], writeToConsole): void {
		writeToConsole(
			BigStateObject.location.neighbors
				.map(location => location.slug)
				.sort()
				.join('    ')
		);
	}
}
