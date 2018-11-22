import React from 'react';
import Terminal from './Terminal';
import LocationManifest, {
	initializeLocations
} from '../locations/LocationManifest';
import { initializeUtilities } from '../utilities/UtilityManifest';
import store, { ActionTypes } from '../store';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		initializeLocations();
		initializeUtilities();

		store.dispatch({
			type: ActionTypes.SET_LOCATION,
			value: LocationManifest['a_quiet_forest']
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
