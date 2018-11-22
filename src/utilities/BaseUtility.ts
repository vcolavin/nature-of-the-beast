export interface RunParams {
	args: string[];
	writeToConsole: (arg: string) => void;
}

export default class BaseUtility {
	run(_params: RunParams): void {
		throw 'not implemented';
	}

	command: string = '';
}
