import React from 'react';
import uuid from '../utils/uuid';

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
	currentPlaceInHistory?: number;
}

interface IProps {}

const INPUT_PROMPT = '~/a/cool/forest > ';

export default class Terminal extends React.Component<IProps, IState> {
	state: IState = {
		terminalHistory: [
			{ content: 'welcome to the forest', id: uuid() },
			{ content: 'feel free to look around', id: uuid() }
		],
		commandHistory: []
	};

	private inputEl: HTMLInputElement = null;

	private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.key) {
			case 'ArrowUp':
				this.goBackInHistory();
				break;
			case 'ArrowDown':
				this.goForwardInHistory();
				break;
			case 'Tab':
				this.writeToConsole('tab completion not yet available');
		}
	};

	private goBackInHistory = () => {
		this.setState(
			state => {
				if (
					state.currentPlaceInHistory ===
					state.commandHistory.length - 1
				) {
					return;
				}

				const newPlace = state.currentPlaceInHistory + 1;

				return {
					currentPlaceInHistory: newPlace
				};
			},
			() => {
				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.inputEl.value = command.content;
				}
			}
		);
	};

	private goForwardInHistory = () => {
		this.setState(
			state => {
				if (state.currentPlaceInHistory === 0) {
					return;
				}

				const newPlace = state.currentPlaceInHistory - 1;

				return {
					currentPlaceInHistory: newPlace
				};
			},
			() => {
				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.inputEl.value = command.content;
				}
			}
		);
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (this.inputEl) {
			const value = this.inputEl.value;
			this.inputEl.value = '';

			this.writeToConsole(`you wrote ${value}. cool.`);
			this.addToHistory(value);
		}
	};

	private addToHistory = (value: string) => {
		this.setState(state => ({
			commandHistory: [
				{
					content: value,
					id: uuid()
				},
				...state.commandHistory
			],
			currentPlaceInHistory: 0
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
