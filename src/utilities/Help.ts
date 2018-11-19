import BaseUtility from './BaseUtility';

export default class Help extends BaseUtility {
	static run(_args: string[]) {
		return 'you have asked for help';
	}
}
