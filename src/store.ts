import { createStore } from 'redux';
import Location, { initialLocation } from './locations/Location';

interface State {
	location: Location;
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION'
}

interface SetLocation {
	type: ActionTypes.SET_LOCATION;
	value: Location;
}

const initialState: State = {
	location: initialLocation
};

// to add new action types, add to the union type like this:
// type Action = SetLocation | OtherAction | TestAction;
type CombinedAction = SetLocation;

function reducer(state: State = initialState, action: CombinedAction): State {
	switch (action.type) {
		case ActionTypes.SET_LOCATION:
			return { ...state, location: action.value };
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
