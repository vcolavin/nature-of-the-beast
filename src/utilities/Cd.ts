import BaseUtility, { RunParams } from './BaseUtility';
import store, { ActionTypes } from '../store';
import Location from '../locations/Location';

export default class Cd extends BaseUtility {
	run({ args, writeToConsole }: RunParams): void {
		const newLocation = store
			.getState()
			.location.neighbors.find((location: Location) => {
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
