import {
	// HistoryItem,s
	HistoryItemContent
} from '../components/Terminal';
import say, { cancelSpeech } from './SpeechUtilities';
import uuid from './uuid';
import store, { ActionTypes } from '../store';

export type IConsoleWriteArgs = {
	text: HistoryItemContent;
	speak?: boolean;
};

interface RevocableConsoleWriter {
	revoke: () => void;
	writeToConsole: (arg1: IConsoleWriteArgs) => Promise<null>;
}

export default class OutputController {
	static historyManifest: { [key: string]: HistoryItemContent } = {};
	private static revocableOutputters: RevocableConsoleWriter[];

	static getRevocableOutputter(): RevocableConsoleWriter {
		let revoked = false;

		const outputter = {
			revoke: () => {
				revoked = true;
			},
			writeToConsole: (args: IConsoleWriteArgs) =>
				revoked ? Promise.resolve(null) : OutputController.output(args)
		};

		OutputController.revocableOutputters.push(outputter);

		return outputter;
	}

	static output({ text, speak }: IConsoleWriteArgs): Promise<null> {
		let speechPromise = null;

		if (speak && typeof text !== 'string') {
			throw 'cannot "speak" a component';
		} else if (speak && typeof text === 'string') {
			speechPromise = say(text);
		}

		store.dispatch({
			type: ActionTypes.ADD_TO_HISTORY,
			value: {
				content: text,
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
