import React from 'react';
import Terminal from './Terminal';
import { initializeLocations } from '../locations/LocationManifest';
import { initializeUtilities } from '../utilities/UtilityManifest';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		initializeLocations();
		initializeUtilities();
	}

	render() {
		return (
			<div className="main">
				<Terminal />
			</div>
		);
	}
}
