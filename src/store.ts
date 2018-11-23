import { createStore, Action } from 'redux';

import Location, { initialLocation } from './locations/Location';

interface State {
	location: Location;
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION'
}

interface SetLocationAction extends Action {
	type: ActionTypes.SET_LOCATION;
	value: Location;
}

// to add new action types, add to the union type like this:
/* type Action = SetLocationAction | OtherAction | TestAction; */
type CombinedActions = SetLocationAction;

function reducer(state?: State, action?: CombinedActions): State {
	if (!state || !action) {
		return {
			location: initialLocation
		};
	}

	switch (action.type) {
		case ActionTypes.SET_LOCATION:
			return { ...state, location: action.value };
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
