import BaseUtility, { RunParams } from './BaseUtility';

export default class Echo extends BaseUtility {
	run({ args, writeToConsole }: RunParams): void {
		writeToConsole(args.join(' '));
	}

	command = 'echo';
}
