import { createStore } from 'redux';

import Location, { initialLocation } from './locations/Location';

interface State {
	location: Location;
}

export enum ActionTypes {
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

function reducer(state?: State, action?: Action): State {
	if (!state) {
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
