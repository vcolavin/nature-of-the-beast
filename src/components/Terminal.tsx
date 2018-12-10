import React from 'react';
import uuid from '../utils/uuid';
import UtilityManifest from '../utilities/UtilityManifest';
import store, { getCurrentLocation, ActionTypes, RootState } from '../store';
import { connect } from 'react-redux';
import TerminalBuffer from './TerminalBuffer';

interface CommandItem {
	content: string;
	id: string;
}

export interface HistoryItem {
	content: string;
	id: string;
}

interface TerminalState {
	commandHistory: CommandItem[];
	terminalHistory: HistoryItem[];
	currentPlaceInHistory: number;
}

interface TerminalProps {
	consoleInteractive: boolean;
}

interface ConsoleWriter {
	revoke: () => void;
	writeToConsole: (string: string) => void;
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
		],
		commandHistory: [],
		currentPlaceInHistory: -1
	};

	private inputEl: HTMLInputElement | null = null;
	private consoleWriters: ConsoleWriter[] = [];

	private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		this.revokeConsoleWriters();

		switch (e.key) {
			case 'ArrowUp':
				this.goBackInHistory();
				this.moveCursorToEnd();
				break;
			case 'ArrowDown':
				this.goForwardInHistory();
				this.moveCursorToEnd();
				break;
			case 'Tab':
				e.preventDefault();
				this.tabComplete();
				break;
			default:
		}
	};

	private tabComplete = () => {
		if (this.inputValue === '') {
			return;
		}

		// TODO: Regex could probably do a better job of this
		const [command, ...rest] = this.inputValue.split(' ');

		let currentVal = rest[rest.length - 1];

		if (typeof currentVal === 'undefined') {
			currentVal = '';
		}

		const options = [
			...getCurrentLocation().neighborSlugs,
			...getCurrentLocation().itemSlugs
		].filter((slug: string) => slug.indexOf(currentVal) === 0);

		switch (options.length) {
			case 0:
				break;
			case 1:
				const newValue = [
					command,
					...rest.slice(0, rest.length - 1),
					options[0]
				].join(' ');
				this.inputValue = newValue;
				break;
			default:
				this.writeToConsole(
					options.reduce(
						(memo: string, option: string) =>
							`${memo}${TAB_WIDTH}${option}`
					)
				);
				break;
		}
		return;
	};

	private goBackInHistory = () => {
		this.setState(
			state => {
				if (
					state.currentPlaceInHistory ===
					state.commandHistory.length + 1
				) {
					return null;
				}

				return {
					currentPlaceInHistory: state.currentPlaceInHistory + 1
				};
			},
			() => {
				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.inputValue = command.content;
				}
			}
		);
	};

	private moveCursorToEnd = () => {
		window.setTimeout(() => {
			if (this.inputEl) {
				this.inputEl.selectionStart = 1000;
			}
		}, 0);
	};

	private goForwardInHistory = () => {
		this.setState(
			state => {
				if (state.currentPlaceInHistory === -1) {
					return null;
				}

				return {
					currentPlaceInHistory: state.currentPlaceInHistory - 1
				};
			},
			() => {
				if (this.state.currentPlaceInHistory === -1) {
					this.inputValue = '';
				}

				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.inputValue = command.content;
				}
			}
		);
	};

	private get inputValue(): string {
		return this.inputEl ? this.inputEl.value : '';
	}

	private set inputValue(value: string) {
		if (this.inputEl) {
			this.inputEl.value = value;
		}
	}

	private getRevocableConsoleWriter = (): ConsoleWriter => {
		let revoked = false;

		return {
			revoke: () => {
				revoked = true;
			},
			writeToConsole: (string: string) => {
				if (!revoked) {
					this.writeToConsole(string);
				}
			}
		};
	};

	private revokeConsoleWriters = (): void => {
		this.consoleWriters.forEach(writer => {
			writer.revoke();
		});

		this.consoleWriters = [];

		store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const value = this.inputValue;
		this.inputValue = '';

		this.addToCommandHistory(value);

		const [utilityName, ...args] = value.split(' ');

		const utility = UtilityManifest[utilityName];

		this.writeToConsole(`${inputPrompt()}${value}`);

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
			this.writeToConsole(`I don't know how to ${utilityName}`);
		}
	};

	private addToCommandHistory = (value: string) => {
		this.setState(state => ({
			commandHistory: [
				{
					content: value,
					id: uuid()
				},
				...state.commandHistory
			],
			currentPlaceInHistory: -1
		}));
	};

	private writeToConsole = (value: string) => {
		this.setState(state => ({
			terminalHistory: [
				...state.terminalHistory,
				{
					content: value,
					id: uuid()
				}
			]
		}));
	};

	render() {
		return (
			<div
				className="terminal"
				onClick={() => {
					this.inputEl && this.inputEl.focus();
				}}
				onKeyDown={this.handleKeyDown}
			>
				<TerminalBuffer terminalHistory={this.state.terminalHistory} />

				{this.props.consoleInteractive && (
					<form className="input-form" onSubmit={this.handleSubmit}>
						<span className="input-prompt">{inputPrompt()}</span>
						<input
							className="input"
							type="text"
							ref={e => {
								this.inputEl = e;
								this.inputEl && this.inputEl.focus();
							}}
						/>
					</form>
				)}
			</div>
		);
	}
}

function mapStateToProps(state: RootState): TerminalProps {
	return { consoleInteractive: state.consoleInteractive };
}

export default connect(mapStateToProps)(Terminal);
