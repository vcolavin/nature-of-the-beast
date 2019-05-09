import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { ActionTypes } from '../store';

export default class Mute extends BaseUtility {
	protected _run({
		output,
		dispatch,
		state: { soundOn }
	}: PrivateRunParams): Promise<null> {
		dispatch({ type: ActionTypes.TOGGLE_SOUND });

		output({
			content: `Sound has been turned ${soundOn ? 'off' : 'on'}.`
		});

		return Promise.resolve(null);
	}

	command = 'mute';
	aliases = ['quiet'];
	helpDescription = 'smash the mute button';
}
