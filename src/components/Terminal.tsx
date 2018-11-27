import React from 'react';
import uuid from '../utils/uuid';
import UtilityManifest from '../utilities/UtilityManifest';
import store, { getCurrentLocation } from '../store';
import Location from '../locations/Location';

interface CommandItem {
	content: string;
	id: string;
}

interface HistoryItem {
	content: string;
	id: string;
}

interface State {
	commandHistory: CommandItem[];
	terminalHistory: HistoryItem[];
	currentPlaceInHistory: number;
}

interface ConsoleWriter {
	revoke: () => void;
	writeToConsole: (string: string) => void;
}

function inputPrompt(): string {
	return `~/${store.getState().location} > `;
}
export const TAB_WIDTH = '    ';

export default class Terminal extends React.Component<{}, State> {
	state: State = {
		terminalHistory: [
			{ content: 'you are in a freaky forest', id: uuid() },
			{
				content: 'type help to get an idea of what is going on',
				id: uuid()
			}
		],
		commandHistory: [],
		currentPlaceInHistory: -1
	};

	private inputEl: HTMLInputElement | null = null;
	private consoleWriters: ConsoleWriter[] = [];

	private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
		let [command, currentVal] = this.inputValue.split(' ');

		if (typeof currentVal === 'undefined') {
			currentVal = '';
		}

		const options = getCurrentLocation().neighborSlugs.filter(
			(slug: string) => slug.indexOf(currentVal) === 0
		);

		if (options.length === 0) {
			return;
		}

		if (options.length === 1) {
			this.inputValue = `${command} ${options[0]}`;
			return;
		}

		this.writeToConsole(
			options.reduce(
				(memo: string, option: string) => `${memo}${TAB_WIDTH}${option}`
			)
		);
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

	private getRevocableConsoleWriter(): ConsoleWriter {
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
	}

	private revokeConsoleWriters(): void {
		this.consoleWriters.forEach(writer => {
			writer.revoke();
		});

		this.consoleWriters = [];
	}

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const value = this.inputValue;
		this.inputValue = '';

		this.revokeConsoleWriters();

		this.addToCommandHistory(value);

		const [utilityName, ...args] = value.split(' ');

		const utility = UtilityManifest[utilityName];

		this.writeToConsole(`${inputPrompt()}${value}`);

		if (utility) {
			const revocableConsoleWriter = this.getRevocableConsoleWriter();
			this.consoleWriters.push(revocableConsoleWriter);

			utility.run({
				args,
				writeToConsole: revocableConsoleWriter.writeToConsole
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
				<pre className="terminal-buffer">
					{this.state.terminalHistory.reduce(
						(memo, historyItem) =>
							`${memo}\n${historyItem.content}`,
						''
					)}
				</pre>

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
			</div>
		);
	}
}
