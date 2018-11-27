import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';

export default class Look extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		let timeAccumulator = 0;

		getCurrentLocation().descriptions.forEach(description => {
			timeAccumulator +=
				typeof description.timer === 'undefined'
					? 2500
					: description.timer;

			window.setTimeout(() => {
				writeToConsole(description.text);
			}, timeAccumulator);
		});
	}

	command = 'look';
}
