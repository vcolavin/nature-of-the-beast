import BaseUtility, { RunParams } from './BaseUtility';

export default class Echo extends BaseUtility {
	run({ args, writeToConsole }: RunParams): Promise<null> {
		writeToConsole(args.join(' '));
		return Promise.resolve(null);
	}

	command = 'echo';
	helpDescription =
		'Use echo to say something out loud. Example:\n\necho Is anyone there?';
}
