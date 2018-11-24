import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';

export default class Look extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		let timeAccumulator = 0;

		store.getState().location.descriptions.forEach(description => {
			timeAccumulator += description.timer || 2500;

			window.setTimeout(() => {
				writeToConsole(description.text);
			}, timeAccumulator);
		});
	}

	command = 'look';
}
