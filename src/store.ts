import { createStore, AnyAction } from 'redux';
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

function reducer(state: State = initialState, action: AnyAction): State {
	// I don't understand TS deeply enough to know why this is necessary
	// but it certainly is
	// https://github.com/reduxjs/redux/pull/2467
	const typedAction = action as CombinedAction;

	switch (typedAction.type) {
		case ActionTypes.SET_LOCATION:
			return { ...state, location: typedAction.value };
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
