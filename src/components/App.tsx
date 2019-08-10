import React from 'react';
import Terminal from './Terminal';
import { initializeLocations } from '../nouns/LocationManifest';
import {
	initializeUtilities,
	UtilityManifest
} from '../utilities/UtilityManifest';
import store, { ActionTypes, RootState, DispatchProps } from '../store';
import { initializeItems } from '../nouns/ItemManifest';
import { setUrlLocation } from '../utilities/Cd';
import { connect } from 'react-redux';

const INITIAL_LOCATION_SLUG = 'a_quiet_forest';

interface StoreProps {
	state: RootState;
}

interface Props extends DispatchProps, StoreProps {}

class App extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		const { dispatch, state } = props;

		initializeLocations();
		initializeUtilities();
		initializeItems();

		setUrlLocation({ location: INITIAL_LOCATION_SLUG });

		store.dispatch({
			type: ActionTypes.SET_LOCATION,
			value: INITIAL_LOCATION_SLUG
		});

		const helpUtility = UtilityManifest['help'];

		helpUtility.run({ args: [], dispatch, state });
	}

	render() {
		return <Terminal />;
	}
}

const mapStateToProps = (state: RootState): StoreProps => ({
	state
});

export default connect(mapStateToProps)(App);
