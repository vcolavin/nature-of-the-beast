import BaseUtility from './BaseUtility';
import getState from '../BigStateObject';

export default class Cd extends BaseUtility {
	run(args: string[], writeToConsole): void {
		const newLocation = getState().location.neighbors.find(location => {
			return location.slug === args[0];
		});

		if (newLocation) {
			getState().location = newLocation;
			return;
		}

		writeToConsole(`invalid location ${args[0]}`);
	}

	command = 'cd';
}
