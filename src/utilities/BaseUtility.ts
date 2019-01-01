import { HistoryItemContent } from '../components/Terminal';

export interface RunParams {
	args: string[];
	writeToConsole: (arg: HistoryItemContent) => void;
}

export default class BaseUtility {
	run(_params: RunParams): Promise<null> {
		throw 'not implemented';
	}

	command: string = '';
	helpDescription: string = '';
}
