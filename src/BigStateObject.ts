import Location from './locations/Location';
import LocationManifest from './locations/LocationManifest';

interface State {
	location: Location;
}

enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	OTHER_ACTION = 'IDK'
}

interface SetLocationAction {
	type: ActionTypes.SET_LOCATION;
	value: Location;
}

// to add new action types, add to the union type like this:
/* type Action = SetLocationAction | OtherAction | TestAction; */
type Action = SetLocationAction;

export default function reducer(state?: State, action?: Action): State {
	if (!state) {
		return {
			location: LocationManifest['a_quiet_forest']
		};
	}

	switch (action.type) {
		case ActionTypes.SET_LOCATION:
			return { ...state, location: action.value };
		default:
			return state;
	}
}
