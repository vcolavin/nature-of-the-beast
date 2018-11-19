import BaseUtility from './BaseUtility';

export default class WhoAmI extends BaseUtility {
	private static counter = 0;

	private static responses: string[] = [
		"I don't remember",
		'I am glad you asked. I am glad you are here.',
		"I don't know who you are",
		'You are an echo of an echo',
		'You are a grease smudge on a screen',
		'You were a mistake',
		'You are a dog lover'
	];

	static run(_args: string[], writeToConsole): void {
		window.setTimeout(() => {
			writeToConsole(this.responses[this.counter++]);
		}, 500);
	}
}
