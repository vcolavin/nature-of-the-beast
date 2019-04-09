import React from 'react';
import Terminal from './Terminal';
import { initializeLocations } from '../nouns/LocationManifest';
import { initializeUtilities } from '../utilities/UtilityManifest';
import store, { ActionTypes } from '../store';
import { initializeItems } from '../nouns/ItemManifest';
import { setUrlLocation } from '../utilities/Cd';
import OutputController from '../utils/OutputController';

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

		OutputController.output({
			content:
				'you are in a cold rain, and in a quiet forest\nrotted ice falls irregularly around you\ntype "help" to get started'
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
