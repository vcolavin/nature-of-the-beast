import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes, getCurrentLocation } from '../store';
import LocationManifest from '../nouns/LocationManifest';

const INVALID_LOCATION = 'INVALID_LOCATION';

export default class Cd extends BaseUtility {
	private goToLocation = (location: string) => {
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
			type: ActionTypes.SET_LOCATION,
			value: newLocation
		});
	};

	_run({ args, output }: PrivateRunParams): Promise<null> {
		const { location: initialLocation } = store.getState();

		try {
			args[0]
				.split('/')
				.filter(location => location)
				.forEach(this.goToLocation);
		} catch (e) {
			if (e.code === INVALID_LOCATION) {
				output({ content: e.message });

				store.dispatch({
					type: ActionTypes.SET_LOCATION,
					value: initialLocation
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

	getTabCompleteOptions = (path: string): string[] => {
		const locations = path.split('/');

		const locationChain = locations.splice(0, locations.length - 1);
		const finalFragment = locations[locations.length - 1];

		if (!this.locationChainValid(locationChain)) {
			return [];
		}

		const finalLocationInChain =
			locationChain.length === 0
				? getCurrentLocation()
				: LocationManifest[locationChain[locationChain.length - 1]];

		if (!finalLocationInChain) {
			return [];
		}

		const options = finalLocationInChain.neighborSlugs.filter(
			(slug: string) => slug.indexOf(finalFragment) === 0
		);

		if (options.length === 1) {
			const path =
				locationChain.length === 0 ? '' : `${locationChain.join('/')}/`;
			return [`${path}${options[0]}/`];
		}

		return options;
	};

	private locationChainValid = (locations: string[]): boolean => {
		if (locations.length === 0) {
			return true;
		}

		// for some reason TS won't let me return the result of this reduce directly
		const valid = locations.reduce((memo, location, i, arr) => {
			if (i === 0) {
				return true;
			}

			if (!memo) {
				return false;
			}

			const prevLocation = LocationManifest[arr[i - 1]];

			return prevLocation.neighborSlugs.indexOf(location) >= 0;
		}, true);

		return valid;
	};

	command = 'goto';
	aliases = ['cd', 'go', 'g'];
	helpDescription =
		'Use goto to move to a new location. For example:\n\n goto a_cold_cabin';
}

export function setUrlLocation({ location }: { location: string }): void {
	window.location.hash = location;
}
