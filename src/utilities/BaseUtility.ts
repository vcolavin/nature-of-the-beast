import OutputController, { OutputterFunction } from '../utils/OutputController';

export interface RunParams {
	args: string[];
}

export interface PrivateRunParams {
	args: string[];
	output: OutputterFunction;
}

export default class BaseUtility {
	run(_params: RunParams): Promise<null> {
		const output = OutputController.getRevocableOutputter();

		return this._run({ ..._params, output });
	}

	_run(_params: PrivateRunParams): Promise<null> {
		throw 'not implemented';
	}

	command: string = '';
	helpDescription: string = '';
}
