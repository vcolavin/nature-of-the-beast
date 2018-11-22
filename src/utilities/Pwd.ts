import BaseUtility from './BaseUtility';
import getState from '../BigStateObject';

export default class Pwd extends BaseUtility {
	run(_args: string[], writeToConsole): void {
		writeToConsole(getState().location.description);
	}

	command = 'pwd';
}
