import { HistoryItemContent, HistoryItem } from '../components/Terminal';
import say, { cancelSpeech } from './SpeechUtilities';
import uuid from './uuid';
import store, {
	ActionTypes,
	clearStoreHistory,
	pushToStoreHistory
} from '../store';
import { Dispatch } from 'redux';
import curry from 'ramda/src/curry';

export type IOutputterArgs = {
	content: HistoryItemContent;
	speak?: boolean;
};

export type OutputterFunction = (
	arg1: Dispatch,
	arg2: IOutputterArgs
) => Promise<null>;

// TODO: is there a way to infer the type of a curried function,
// rather than having to hard-code it like this?
export type CurriedOutputterFunction = (arg1: IOutputterArgs) => Promise<null>;

interface RevocableOutputter {
	revoke: () => void;
	output: CurriedOutputterFunction;
}

export default class OutputController {
	// Make the public manifest a readonly clone of the mutable private manifest
	private static _historyManifest: { [key: string]: HistoryItemContent } = {};
	static readonly historyManifest = OutputController._historyManifest;

	private static revocableOutputters: RevocableOutputter[] = [];

	private static pushItem(dispatch: Dispatch, item: HistoryItem) {
		OutputController.historyManifest[item.id] = item.content;
		dispatch(pushToStoreHistory(item));
	}

	static clearHistory(dispatch: Dispatch) {
		OutputController._historyManifest = {};
		dispatch(clearStoreHistory());
	}

	static getRevocableOutputter(dispatch: Dispatch): CurriedOutputterFunction {
		let revoked = false;

		const curriedOutputter = curry(OutputController.output)(dispatch);

		const revocableOutputter = {
			revoke: () => {
				revoked = true;
			},
			output: (args: IOutputterArgs) =>
				revoked ? Promise.resolve(null) : curriedOutputter(args)
		};

		OutputController.revocableOutputters.push(revocableOutputter);

		return revocableOutputter.output;
	}

	static output = (
		dispatch: Dispatch,
		{ content, speak }: IOutputterArgs
	): Promise<null> => {
		let speechPromise = Promise.resolve(null);

		if (speak && typeof content === 'string') {
			speechPromise = say(content);
		}

		OutputController.pushItem(dispatch, { id: uuid(), content });

		return speechPromise;
	};

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
