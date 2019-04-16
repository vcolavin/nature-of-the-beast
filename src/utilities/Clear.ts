import BaseUtility, { PrivateRunParams } from './BaseUtility';
import OutputController from '../utils/OutputController';

export default class Clear extends BaseUtility {
	_run({  }: PrivateRunParams): Promise<null> {
		OutputController.clearHistory();
		return Promise.resolve(null);
	}

	command = 'clear';
	helpDescription = 'Clears the screen.';
	aliases = ['cl'];
}
