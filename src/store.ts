import { createStore } from 'redux';
import Location from './nouns/Location';
import LocationManifest, {
	loading as loadingLocation
} from './nouns/LocationManifest';
import { HistoryItem } from './components/Terminal';
import { historyManifest } from './utils/OutputController';

export interface RootState {
	location: string;
	previousLocationStack: string[];
	consoleInteractive: boolean;
	inventory: string[];
	history: string[];
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	POP_LOCATION_STACK = 'POP_LOCATION_STACK',
	PUSH_LOCATION_STACK = 'PUSH_LOCATION_STACK',
	LOCK_CONSOLE = 'LOCK_CONSOLE',
	RELEASE_CONSOLE = 'RELEASE_CONSOLE',
	ADD_TO_INVENTORY = 'ADD_TO_INVENTORY',
	ADD_TO_HISTORY = 'ADD_TO_HISTORY'
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

interface LockConsole {
	type: ActionTypes.LOCK_CONSOLE;
}

interface ReleaseConsole {
	type: ActionTypes.RELEASE_CONSOLE;
}

interface AddToInventory {
	type: ActionTypes.ADD_TO_INVENTORY;
	value: string;
}

interface AddToHistory {
	type: ActionTypes.ADD_TO_HISTORY;
	value: HistoryItem;
}

const initialState: RootState = {
	location: loadingLocation.slug,
	previousLocationStack: [],
	consoleInteractive: true,
	inventory: [],
	history: []
};

type CombinedAction =
	| SetLocation
	| PopLocationStack
	| PushLocationStack
	| LockConsole
	| ReleaseConsole
	| AddToInventory
	| AddToHistory;

function reducer(
	state: RootState = initialState,
	action: CombinedAction
): RootState {
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
		case ActionTypes.LOCK_CONSOLE:
			return {
				...state,
				consoleInteractive: false
			};
		case ActionTypes.RELEASE_CONSOLE:
			return {
				...state,
				consoleInteractive: true
			};
		case ActionTypes.ADD_TO_INVENTORY:
			return {
				...state,
				inventory: [...state.inventory, action.value]
			};
		case ActionTypes.ADD_TO_HISTORY:
			// FIXME: reducers shouldn't have side effects
			// the solution is to wrap this action in an action creator
			// but this is ok for right now.
			historyManifest[action.value.id] = action.value.content;

			return {
				...state,
				history: [...state.history, action.value.id]
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
