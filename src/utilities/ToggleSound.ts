import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes } from '../store';

export default class ToggleSound extends BaseUtility {
	_run({  }: PrivateRunParams): Promise<null> {
		store.dispatch({ type: ActionTypes.TOGGLE_SOUND });
		return Promise.resolve(null);
	}

	command = 'toggle-sound';
	helpDescription = 'smash the mute button';
}
