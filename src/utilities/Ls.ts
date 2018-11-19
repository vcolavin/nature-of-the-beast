import BaseUtility from './BaseUtility';
import LocationManifest from '../locations/LocationManifest';

export default class Ls extends BaseUtility {
	static run(_args: string[], writeToConsole): void {
		writeToConsole(
			Object.keys(LocationManifest)
				.sort()
				.join('    ')
		);
	}
}
