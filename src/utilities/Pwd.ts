import BaseUtility from './BaseUtility';
import store from '../store';

export default class Pwd extends BaseUtility {
	run(_args: string[], writeToConsole): void {
		writeToConsole(store.getState().location.description);
	}

	command = 'pwd';
}
