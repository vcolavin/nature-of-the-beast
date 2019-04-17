import { createStore } from 'redux';
import Location from './nouns/Location';
import LocationManifest from './nouns/LocationManifest';
import { HistoryItem } from './components/Terminal';

export interface RootState {
	location: string;
	previousLocationStack: string[];
	consoleInteractive: boolean;
	inventory: string[];
	history: string[];
	soundOn: boolean;
}

export enum ActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	POP_LOCATION_STACK = 'POP_LOCATION_STACK',
	PUSH_LOCATION_STACK = 'PUSH_LOCATION_STACK',
	SET_LOCATION_STACK = 'SET_LOCATION_STACK',
	LOCK_CONSOLE = 'LOCK_CONSOLE',
	RELEASE_CONSOLE = 'RELEASE_CONSOLE',
	ADD_TO_INVENTORY = 'ADD_TO_INVENTORY',
	PUSH_HISTORY = 'PUSH_HISTORY',
	TOGGLE_SOUND = 'TOGGLE_SOUND',
	CLEAR_HISTORY = 'CLEAR_HISTORY'
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

interface SetLocationStack {
	type: ActionTypes.SET_LOCATION_STACK;
	value: string[];
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
	type: ActionTypes.PUSH_HISTORY;
	value: string;
}

interface ClearHistory {
	type: ActionTypes.CLEAR_HISTORY;
}

interface ToggleSound {
	type: ActionTypes.TOGGLE_SOUND;
}

const initialState: RootState = {
	location: '',
	previousLocationStack: [],
	consoleInteractive: true,
	inventory: [],
	history: [],
	soundOn: true
};

type CombinedAction =
	| SetLocation
	| PopLocationStack
	| PushLocationStack
	| SetLocationStack
	| LockConsole
	| ReleaseConsole
	| AddToInventory
	| AddToHistory
	| ToggleSound
	| ClearHistory;

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
		case ActionTypes.SET_LOCATION_STACK:
			return {
				...state,
				previousLocationStack: action.value
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
		case ActionTypes.PUSH_HISTORY:
			return {
				...state,
				history: [...state.history, action.value]
			};
		case ActionTypes.CLEAR_HISTORY:
			return {
				...state,
				history: []
			};
		case ActionTypes.TOGGLE_SOUND:
			return {
				...state,
				soundOn: !state.soundOn
			};
		default:
			return state;
	}
}

export function pushToStoreHistory(item: HistoryItem) {
	store.dispatch({
		type: ActionTypes.PUSH_HISTORY,
		value: item.id
	});
}

export function clearStoreHistory() {
	store.dispatch({ type: ActionTypes.CLEAR_HISTORY });
}

const store = createStore(reducer);

export default store;

export const getCurrentLocation = (): Location =>
	LocationManifest[store.getState().location];
