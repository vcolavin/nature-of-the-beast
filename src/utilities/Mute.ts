import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store, { ActionTypes } from '../store';

export default class Mute extends BaseUtility {
	_run({ output }: PrivateRunParams): Promise<null> {
		store.dispatch({ type: ActionTypes.TOGGLE_SOUND });

		output({
			content: `Sound has been turned ${
				store.getState().soundOn ? 'on' : 'off'
			}.`
		});

		return Promise.resolve(null);
	}

	command = 'mute';
	aliases = ['quiet'];
	helpDescription = 'smash the mute button';
}
