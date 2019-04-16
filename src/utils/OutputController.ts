import { HistoryItemContent, HistoryItem } from '../components/Terminal';
import say, { cancelSpeech } from './SpeechUtilities';
import uuid from './uuid';
import store, {
	ActionTypes,
	clearStoreHistory,
	pushToStoreHistory
} from '../store';

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
	// Make the public manifest a readonly clone of the mutable private manifest
	private static _historyManifest: { [key: string]: HistoryItemContent } = {};
	static readonly historyManifest = OutputController._historyManifest;

	private static revocableOutputters: RevocableOutputter[] = [];

	private static pushItem(item: HistoryItem) {
		OutputController.historyManifest[item.id] = item.content;
		pushToStoreHistory(item);
	}

	static clearHistory() {
		OutputController._historyManifest = {};
		clearStoreHistory();
	}

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

		const item: HistoryItem = { id: uuid(), content };
		OutputController.pushItem(item);

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
