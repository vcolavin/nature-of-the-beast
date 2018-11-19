export default class BaseUtility {
	run(_args: string[], _writeToConsole?: (string) => void): void {
		throw 'not implemented';
	}

	command: string;
}
