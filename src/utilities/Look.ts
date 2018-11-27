import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';

export default class Look extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		let timeAccumulator = 0;

		getCurrentLocation().descriptions.forEach(description => {
			timeAccumulator += description.timer || 2500;

			window.setTimeout(() => {
				writeToConsole(description.text);
			}, timeAccumulator);
		});
	}

	command = 'look';
}
