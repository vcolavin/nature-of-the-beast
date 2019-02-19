import BaseUtility, { RunParams } from './BaseUtility';

export default class WhoAmI extends BaseUtility {
	private responses: string[] = [
		"I don't remember",
		'But I am glad you asked. I am glad you are here.',
		"I don't know who you are",
		'You are an echo',
		'You were a mistake',
		'You are a dog lover',
		'Or you were'
	];

	run({ writeToConsole }: RunParams): Promise<null> {
		return new Promise(resolve => {
			this.responses.forEach((response, index) => {
				window.setTimeout(() => {
					writeToConsole({ item: response });

					if (index === this.responses.length - 1) {
						resolve();
					}
				}, 1000 + 2500 * index);
			});
		});
	}

	command = 'whoami';
	helpDescription = 'Ask a difficult question. Get a difficult response';
}
