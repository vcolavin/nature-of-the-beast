import React from 'react';
import uuid from '../utils/uuid';
import UtilityManifest from '../utilities/UtilityManifest';
import store, { ActionTypes, RootState } from '../store';
import { connect } from 'react-redux';
import TerminalBuffer from './TerminalBuffer';
import TerminalInput from './TerminalInput';
import say from '../utils/speechUtilities';

export type HistoryItemContent = string | JSX.Element;

export interface HistoryItem {
	content: string | JSX.Element;
	id: string;
}

interface TerminalState {
	terminalHistory: HistoryItem[];
}

interface TerminalProps {
	consoleInteractive: boolean;
}

export type IConsoleWriteArgs = {
	item: HistoryItemContent;
	speak?: boolean;
};

interface RevocableConsoleWriter {
	revoke: () => void;
	writeToConsole: (arg1: IConsoleWriteArgs) => void;
}

function inputPrompt(): string {
	return `~/${store.getState().location} > `;
}

export const TAB_WIDTH = '    ';

class Terminal extends React.Component<TerminalProps, TerminalState> {
	state: TerminalState = {
		terminalHistory: [
			{ content: 'you are in a cold and quiet forest', id: uuid() },
			{ content: 'rain has recently fallen', id: uuid() },
			{
				content: 'type "help", then press enter, to get started',
				id: uuid()
			}
		]
	};

	private consoleWriters: RevocableConsoleWriter[] = [];

	private handleKeydown = (e: Event) => {
		const typedEvent = (e as any) as React.KeyboardEvent;

		const { key } = typedEvent;

		if (
			key === 'Escape' ||
			(typedEvent.ctrlKey && ['c', 'C', 'd', 'D'].indexOf(key) >= 0)
		) {
			this.revokeConsoleWriters();
			store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
		}
	};

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	private getRevocableConsoleWriter = (): RevocableConsoleWriter => {
		let revoked = false;

		return {
			revoke: () => {
				revoked = true;
			},
			writeToConsole: (args: IConsoleWriteArgs) => {
				if (!revoked) {
					this.writeToConsole(args);
				}
			}
		};
	};

	private revokeConsoleWriters = (): void => {
		this.consoleWriters.forEach(writer => {
			writer.revoke();
		});

		this.consoleWriters = [];
	};

	private runCommand = (value: string) => {
		const [utilityName, ...args] = value.split(' ');

		const utility = UtilityManifest[utilityName];

		this.writeToConsole({ item: `${inputPrompt()}${value}` });

		if (utility) {
			const revocableConsoleWriter = this.getRevocableConsoleWriter();
			this.consoleWriters.push(revocableConsoleWriter);

			store.dispatch({ type: ActionTypes.LOCK_CONSOLE });

			utility
				.run({
					args,
					writeToConsole: revocableConsoleWriter.writeToConsole
				})
				.then(() => {
					store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
				});
		} else {
			this.writeToConsole({ item: `I don't know how to ${utilityName}` });
		}
	};

	private writeToConsole = ({ item, speak }: IConsoleWriteArgs) => {
		if (speak && typeof item !== 'string') {
			throw 'cannot "speak" a component';
		} else if (speak && typeof item === 'string') {
			say(item);
		}

		this.setState(state => ({
			terminalHistory: [
				...state.terminalHistory,
				{
					content: item,
					id: uuid()
				}
			]
		}));
	};

	render() {
		const { terminalHistory } = this.state;
		const { consoleInteractive } = this.props;

		return (
			<div className="terminal">
				<TerminalBuffer terminalHistory={terminalHistory} />

				<form
					className={`input-form ${
						consoleInteractive ? 'active' : ''
					}`}
				>
					<span className="input-prompt">{inputPrompt()}</span>

					<TerminalInput
						writeToConsole={this.writeToConsole}
						handleSubmit={this.runCommand}
					/>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state: RootState): TerminalProps {
	return { consoleInteractive: state.consoleInteractive };
}

export default connect(mapStateToProps)(Terminal);
