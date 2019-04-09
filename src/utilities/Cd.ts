import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes, getCurrentLocation } from '../store';

const INVALID_LOCATION = 'INVALID_LOCATION';

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

	private goToLocation = (location: string) => {
		if (location === '..') {
			this.goToPreviousLocation();
			return;
		}

		const newLocation = getCurrentLocation().neighborSlugs.find(
			(slug: string) => slug === location
		);

		if (!newLocation) {
			throw {
				code: INVALID_LOCATION,
				message: `${location} is an invalid location`
			};
		}

		store.dispatch({
			type: ActionTypes.PUSH_LOCATION_STACK,
			value: store.getState().location
		});

		store.dispatch({
			type: ActionTypes.SET_LOCATION,
			value: newLocation
		});
	};

	_run({ args, output }: PrivateRunParams): Promise<null> {
		const {
			location: initialLocation,
			previousLocationStack: initialStack
		} = store.getState();

		try {
			args[0].split('/').forEach(this.goToLocation);
		} catch (e) {
			if (e.code === INVALID_LOCATION) {
				output({ content: e.message });

				store.dispatch({
					type: ActionTypes.SET_LOCATION,
					value: initialLocation
				});

				store.dispatch({
					type: ActionTypes.SET_LOCATION_STACK,
					value: initialStack
				});
			} else {
				throw e;
			}
		}

		setUrlLocation({
			location: store.getState().location
		});

		return Promise.resolve(null);
	}

	command = 'cd';
	helpDescription =
		'Use cd to move to a new location. For example:\n\ncd a_cold_cabin';
}

export function setUrlLocation({ location }: { location: string }): void {
	window.location.hash = location;
}
