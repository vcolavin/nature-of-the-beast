export interface RunParams {
	args: string[];
}

export default class BaseUtility {
	run(_params: RunParams): Promise<null> {
		throw 'not implemented';
	}

	command: string = '';
	helpDescription: string = '';
}
