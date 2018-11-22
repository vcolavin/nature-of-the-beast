import BaseUtility, { RunParams } from './BaseUtility';
import store, { ActionTypes } from '../store';

export default class Cd extends BaseUtility {
	run({ args, writeToConsole }: RunParams): void {
		const newLocation = store
			.getState()
			.location.neighbors.find(location => {
				return location.slug === args[0];
			});

		if (newLocation) {
			store.dispatch({
				type: ActionTypes.SET_LOCATION,
				value: newLocation
			});
			return;
		}

		writeToConsole(`invalid location ${args[0]}`);
	}

	command = 'cd';
}
