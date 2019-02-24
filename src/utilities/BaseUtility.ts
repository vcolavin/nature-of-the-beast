import { IConsoleWriteArgs } from '../components/Terminal';

export interface RunParams {
	args: string[];
	writeToConsole: (arg1: IConsoleWriteArgs) => Promise<null>;
}

export default class BaseUtility {
	run(_params: RunParams): Promise<null> {
		throw 'not implemented';
	}

	command: string = '';
	helpDescription: string = '';
}
