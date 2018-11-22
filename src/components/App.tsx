import React from 'react';
import Terminal from './Terminal';
import LocationManifest, {
	initializeLocations
} from '../locations/LocationManifest';
import { initializeUtilities } from '../utilities/UtilityManifest';
import store, { ActionTypes } from '../store';

interface Props {}

const INITIAL_LOCATION_SLUG = 'a_quiet_forest';

export default class App extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		initializeLocations();
		initializeUtilities();

		store.dispatch({
			type: ActionTypes.SET_LOCATION,
			value: LocationManifest[INITIAL_LOCATION_SLUG]
		});
	}

	render() {
		return (
			<div className="main">
				<Terminal />
			</div>
		);
	}
}
