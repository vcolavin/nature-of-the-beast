import BaseUtility, { RunParams } from './BaseUtility';

export default class WhoAmI extends BaseUtility {
	private responses: string[] = [
		"I don't remember",
		'I am glad you asked. I am glad you are here.',
		"I don't know who you are",
		'You are an echo of an echo',
		'You are a grease smudge on a screen',
		'You were a mistake',
		'You are a dog lover',
		'Or you were a dog lover'
	];

	run({ writeToConsole }: RunParams): void {
		this.responses.forEach((response, index) => {
			window.setTimeout(() => {
				writeToConsole(response);
			}, 1000 + 2500 * index);
		});
	}

	command = 'whoami';
}
