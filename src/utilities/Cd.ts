import BaseUtility from './BaseUtility';
import BigStateObject from '../BigStateObject';

export default class Cd extends BaseUtility {
	static run(args: string[], writeToConsole): void {
		const newLocation = BigStateObject.location.neighbors.find(location => {
			return location.slug === args[0];
		});

		if (newLocation) {
			BigStateObject.location = newLocation;
			return;
		}

		writeToConsole(`invalid location ${args[0]}`);
	}
}
