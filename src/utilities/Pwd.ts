import BaseUtility from './BaseUtility';
import BigStateObject from '../BigStateObject';

export default class Pwd extends BaseUtility {
	static run(_args: string[], writeToConsole): void {
		writeToConsole(
			BigStateObject.path.reduce((memo, location) => {
				return memo + location.title;
			}, '')
		);
	}
}
