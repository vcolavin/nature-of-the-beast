import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';

export default class Pwd extends BaseUtility {
	run({ writeToConsole }: RunParams): void {
		writeToConsole(store.getState().location.description);
	}

	command = 'pwd';
}
