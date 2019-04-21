import OutputController, {
	CurriedOutputterFunction
} from '../utils/OutputController';
import { Dispatch } from 'redux';

export interface RunParams {
	args: string[];
	dispatch: Dispatch;
}

export interface PrivateRunParams extends RunParams {
	output: CurriedOutputterFunction;
}

export default class BaseUtility {
	run(params: RunParams): Promise<null> {
		const output = OutputController.getRevocableOutputter(params.dispatch);

		return this._run({ ...params, output });
	}

	_run(_params: PrivateRunParams): Promise<null> {
		throw 'not implemented';
	}

	getTabCompleteOptions?: (arg: string) => string[];

	command: string = '';
	aliases: string[] = [];
	helpDescription: string = '';
}
