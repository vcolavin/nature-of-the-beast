import { createStore } from 'redux';
import Location, { initialLocation } from './locations/Location';

interface State {
	location: Location;
	previousLocationStack: Location[];
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	POP_LOCATION_STACK = 'POP_LOCATION_STACK',
	PUSH_LOCATION_STACK = 'PUSH_LOCATION_STACK'
}

interface SetLocation {
	type: ActionTypes.SET_LOCATION;
	value: Location;
}

interface PopLocationStack {
	type: ActionTypes.POP_LOCATION_STACK;
}

interface PushLocationStack {
	type: ActionTypes.PUSH_LOCATION_STACK;
	value: Location;
}

const initialState: State = {
	location: initialLocation,
	previousLocationStack: []
};

// to add new action types, add to the union type like this:
// type Action = SetLocation | OtherAction | TestAction;
type CombinedAction = SetLocation | PopLocationStack | PushLocationStack;

function reducer(state: State = initialState, action: CombinedAction): State {
	switch (action.type) {
		case ActionTypes.SET_LOCATION:
			return {
				...state,
				location: action.value
			};
		case ActionTypes.PUSH_LOCATION_STACK:
			return {
				...state,
				previousLocationStack: [
					action.value,
					...state.previousLocationStack
				]
			};
		case ActionTypes.POP_LOCATION_STACK:
			return {
				...state,
				previousLocationStack: state.previousLocationStack.slice(1)
			};
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
