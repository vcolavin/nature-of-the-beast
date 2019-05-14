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

		OutputController.output(store.dispatch, {
			content:
				'The Nature of the Beast:\nA work of interactive fiction by Vincent Colavin.\n\nThis story details an abusive relationship from the victim\'s perspective.\n\nThis story reads descriptions out loud by default. Type "quiet" or "mute" to disable the audio.\n\nPress escape to stop a description.\nType "help" for additional instructions.'
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
