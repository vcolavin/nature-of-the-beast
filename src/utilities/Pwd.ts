import BaseUtility from './BaseUtility';
import BigStateObject from '../BigStateObject';

export default class Pwd extends BaseUtility {
	run(_args: string[], writeToConsole): void {
		writeToConsole(BigStateObject.location.description);
	}

	command = 'pwd';
}
