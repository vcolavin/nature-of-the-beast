import BaseUtility, { RunParams } from './BaseUtility';
import store, { ActionTypes, getCurrentLocation } from '../store';
import Location from '../locations/Location';

export default class Cd extends BaseUtility {
	private goToPreviousLocation() {
		const newLocation = store.getState().previousLocationStack[0];

		store.dispatch({
			type: ActionTypes.POP_LOCATION_STACK
		});

		if (newLocation) {
			store.dispatch({
				type: ActionTypes.SET_LOCATION,
				value: newLocation
			});
		}
	}

	run({ args, writeToConsole }: RunParams): Promise<null> {
		const nullPromise = Promise.resolve(null);

		if (args[0] == '..') {
			this.goToPreviousLocation();
			return nullPromise;
		}

		const newLocation = getCurrentLocation().neighbors.find(
			(location: Location) => location.slug === args[0]
		);

		if (newLocation) {
			store.dispatch({
				type: ActionTypes.PUSH_LOCATION_STACK,
				value: store.getState().location
			});

			store.dispatch({
				type: ActionTypes.SET_LOCATION,
				value: newLocation.slug
			});
		} else {
			writeToConsole(`invalid location ${args[0]}`);
		}

		return nullPromise;
	}

	command = 'cd';
	helpDescription =
		'Use cd to move to a new location. For example:\n\ncd a_cold_cabin';
}
