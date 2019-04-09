import { HistoryItemContent, HistoryItem } from '../components/Terminal';
import say, { cancelSpeech } from './SpeechUtilities';
import uuid from './uuid';
import store, { ActionTypes } from '../store';

export type IOutputterArgs = {
	content: HistoryItemContent;
	speak?: boolean;
};

export type OutputterFunction = (arg1: IOutputterArgs) => Promise<null>;

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
			output: (args: IOutputterArgs) =>
				revoked ? Promise.resolve(null) : OutputController.output(args)
		};

		OutputController.revocableOutputters.push(revocableOutputter);

		return revocableOutputter.output;
	}

	static output({ content, speak }: IOutputterArgs): Promise<null> {
		let speechPromise = null;

		if (speak) {
			if (typeof content !== 'string') {
				throw 'cannot "speak" a component';
			}
			speechPromise = say(content);
		}

		const newHistoryItem: HistoryItem = { id: uuid(), content };

		OutputController.historyManifest[newHistoryItem.id] =
			newHistoryItem.content;

		store.dispatch({
			type: ActionTypes.ADD_TO_HISTORY,
			value: newHistoryItem.id
		});

		return speechPromise ? speechPromise : Promise.resolve(null);
	}

	private static revokeOutputters() {
		OutputController.revocableOutputters.forEach(outputter => {
			outputter.revoke();
		});

		this.revocableOutputters = [];
	}

	static stopOutput() {
		this.revokeOutputters();
		cancelSpeech();
		store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
	}
}
