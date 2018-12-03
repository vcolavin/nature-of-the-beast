import BaseUtility, { RunParams } from './BaseUtility';

export default class Time extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole(new Date().getTime().toString());
		return Promise.resolve(null);
	}

	command = 'time';
}
