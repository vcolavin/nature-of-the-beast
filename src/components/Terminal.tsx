import React from 'react';
import uuid from '../utils/uuid';
import UtilityManifest from '../utilities/UtilityManifest';
import store from '../store';
import Location from '../locations/Location';

interface ICommandItem {
	content: string;
	id: string;
}

interface IHistoryItem {
	content: string;
	id: string;
}

interface IState {
	commandHistory: ICommandItem[];
	terminalHistory: IHistoryItem[];
	currentPlaceInHistory: number;
}

const INPUT_PROMPT = '~/ > ';

export default class Terminal extends React.Component<{}, IState> {
	state: IState = {
		terminalHistory: [
			{ content: 'welcome to the forest', id: uuid() },
			{ content: 'feel free to look around', id: uuid() }
		],
		commandHistory: [],
		currentPlaceInHistory: -1
	};

	private inputEl: HTMLInputElement | null = null;

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

		const options = store
			.getState()
			.location.neighbors.filter(
				(location: Location) => location.slug.indexOf(currentVal) === 0
			)
			.map((location: Location) => location.slug);

		if (options.length === 1) {
			this.inputValue = `${command} ${options[0]}`;
		} else if (options.length > 1) {
			this.writeToConsole(
				options.reduce(
					(memo: string, option: string) => `${memo}    ${option}`
				)
			);
		}
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

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const value = this.inputValue;
		this.inputValue = '';

		this.addToCommandHistory(value);

		const [utilityName, ...args] = value.split(' ');

		const utility = UtilityManifest[utilityName];

		this.writeToConsole(`${INPUT_PROMPT}${value}`);

		utility
			? utility.run({ args, writeToConsole: this.writeToConsole })
			: this.writeToConsole(`I don't know how to ${utilityName}`);
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
					<span className="input-prompt">{INPUT_PROMPT}</span>
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
