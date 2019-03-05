import { HistoryItemContent } from '../components/Terminal';
import say, { cancelSpeech } from './SpeechUtilities';
import uuid from './uuid';
import store, { ActionTypes } from '../store';

export type IConsoleWriteArgs = {
	content: HistoryItemContent;
	speak?: boolean;
};

export type OutputterFunction = (arg1: IConsoleWriteArgs) => Promise<null>;

interface RevocableOutputter {
	revoke: () => void;
	output: OutputterFunction;
}

export default class OutputController {
	static historyManifest: { [key: string]: HistoryItemContent } = {};
	private static revocableOutputters: RevocableOutputter[] = [];

	static getRevocableOutputter(): OutputterFunction {
		let revoked = false;

		const revocableOutputter = {
			revoke: () => {
				revoked = true;
			},
			output: (args: IConsoleWriteArgs) =>
				revoked ? Promise.resolve(null) : OutputController.output(args)
		};

		OutputController.revocableOutputters.push(revocableOutputter);

		return revocableOutputter.output;
	}

	static output({ content, speak }: IConsoleWriteArgs): Promise<null> {
		let speechPromise = null;

		if (speak && typeof content !== 'string') {
			throw 'cannot "speak" a component';
		} else if (speak && typeof content === 'string') {
			speechPromise = say(content);
		}

		store.dispatch({
			type: ActionTypes.ADD_TO_HISTORY,
			value: {
				content,
				id: uuid()
			}
		});

		return speechPromise ? speechPromise : Promise.resolve(null);
	}

	private static revokeOutputters() {
		OutputController.revocableOutputters.forEach(writer => {
			writer.revoke();
		});

		this.revocableOutputters = [];
	}

	static stopOutput() {
		this.revokeOutputters();
		cancelSpeech();
		store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
	}
}
