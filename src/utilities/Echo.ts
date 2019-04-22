import BaseUtility, { PrivateRunParams } from './BaseUtility';

export default class Echo extends BaseUtility {
	protected _run({ args, output }: PrivateRunParams): Promise<null> {
		output({ content: args.join(' ') });
		return Promise.resolve(null);
	}

	command = 'echo';
	helpDescription =
		'Use echo to say something out loud. Example:\n\necho Is anyone there?';
	aliases = ['say'];
}
