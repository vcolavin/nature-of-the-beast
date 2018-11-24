import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';

export default class Look extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		store.getState().location.descriptions.forEach((description, index) => {
			window.setTimeout(() => {
				writeToConsole(description.text);
			}, description.timer || 2500 * index);
		});
	}

	command = 'look';
}
