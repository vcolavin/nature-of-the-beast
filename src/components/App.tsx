import React from 'react';
import Terminal from './Terminal';
import { initializeLocations } from '../nouns/LocationManifest';
import { initializeUtilities } from '../utilities/UtilityManifest';
import store, { ActionTypes } from '../store';
import { initializeItems } from '../nouns/ItemManifest';

const INITIAL_LOCATION_SLUG = 'a_quiet_forest';

export default class App extends React.Component<{}, {}> {
	constructor(props: {}) {
		super(props);

		initializeLocations();
		initializeUtilities();
		initializeItems();

		setUrlLocation({ location: INITIAL_LOCATION_SLUG });

		store.dispatch({
			type: ActionTypes.SET_LOCATION,
			value: INITIAL_LOCATION_SLUG
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
