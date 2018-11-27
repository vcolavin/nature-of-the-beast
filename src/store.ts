import { createStore } from 'redux';
import Location from './locations/Location';
import LocationManifest, { loading } from './locations/LocationManifest';

interface State {
	location: string;
	previousLocationStack: string[];
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	POP_LOCATION_STACK = 'POP_LOCATION_STACK',
	PUSH_LOCATION_STACK = 'PUSH_LOCATION_STACK'
}

interface SetLocation {
	type: ActionTypes.SET_LOCATION;
	value: string;
}

interface PopLocationStack {
	type: ActionTypes.POP_LOCATION_STACK;
}

interface PushLocationStack {
	type: ActionTypes.PUSH_LOCATION_STACK;
	value: string;
}

const initialState: State = {
	location: loading.slug,
	previousLocationStack: []
};

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

export function getCurrentLocation(): Location {
	return LocationManifest[store.getState().location];
}
