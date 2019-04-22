import OutputController, {
	CurriedOutputterFunction
} from '../utils/OutputController';
import { Dispatch } from 'redux';
import { RootState } from '../store';

export interface RunParams {
	args: string[];
	dispatch: Dispatch;
	state: RootState;
}

export interface PrivateRunParams extends RunParams {
	output: CurriedOutputterFunction;
}

export default abstract class BaseUtility {
	run(params: RunParams): Promise<null> {
		const output = OutputController.getRevocableOutputter(params.dispatch);

		return this._run({ ...params, output });
	}

	protected abstract _run(params: PrivateRunParams): Promise<null>;

	getTabCompleteOptions?: (state: RootState, args: string) => string[];

	command: string = '';
	aliases: string[] = [];
	helpDescription: string = '';
}
