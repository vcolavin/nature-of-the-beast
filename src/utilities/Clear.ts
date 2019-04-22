import BaseUtility, { PrivateRunParams } from './BaseUtility';
import OutputController from '../utils/OutputController';

export default class Clear extends BaseUtility {
	protected _run({ dispatch }: PrivateRunParams): Promise<null> {
		OutputController.clearHistory(dispatch);
		return Promise.resolve(null);
	}

	command = 'clear';
	helpDescription = 'Clears the screen.';
	aliases = ['cl'];
}
