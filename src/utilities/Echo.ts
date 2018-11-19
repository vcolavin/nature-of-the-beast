import BaseUtility from './BaseUtility';

export default class Echo extends BaseUtility {
	static run(args: string[]): Promise<string> {
		return new Promise(resolve => {
			resolve(args.join(' '));
		});
	}
}
