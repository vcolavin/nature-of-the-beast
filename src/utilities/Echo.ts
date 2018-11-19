import BaseUtility from './BaseUtility';

export default class Echo extends BaseUtility {
	run(args: string[], writeToConsole): void {
		writeToConsole(args.join(' '));
	}

	command = 'echo';
}
