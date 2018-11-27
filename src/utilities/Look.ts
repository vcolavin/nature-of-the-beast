import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';

export default class Look extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		return new Promise(resolve => {
			let timeAccumulator = 0;

			const descriptions = getCurrentLocation().descriptions;

			descriptions.forEach((description, i) => {
				timeAccumulator +=
					typeof description.timer === 'undefined'
						? 1500
						: description.timer;

				window.setTimeout(() => {
					writeToConsole(description.text);

					if (i === descriptions.length - 1) {
						resolve();
					}
				}, timeAccumulator);
			});
		});
	}

	command = 'look';
}
