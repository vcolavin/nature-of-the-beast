export interface RunParams {
	args: string[];
	writeToConsole: (arg: string) => void;
}

export default class BaseUtility {
	run(_params: RunParams): Promise<null> {
		throw 'not implemented';
	}

	command: string = '';
}
