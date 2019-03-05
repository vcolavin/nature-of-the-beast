import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes } from '../store';

export default class Mute extends BaseUtility {
	_run({  }: PrivateRunParams): Promise<null> {
		store.dispatch({ type: ActionTypes.TOGGLE_SOUND });
		return Promise.resolve(null);
	}

	command = 'mute';
	helpDescription = 'smash the mute button';
}
