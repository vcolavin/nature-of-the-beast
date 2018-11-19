import BaseUtility from './BaseUtility';

export default class Echo extends BaseUtility {
	static run(args: string[]) {
		return args.join(' ');
	}
}
