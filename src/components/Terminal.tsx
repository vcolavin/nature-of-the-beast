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
				console.log('arrow up!');
				break;
			case 'ArrowDown':
				console.log('arrow down!');
				break;
			case 'Tab':
				this.writeToConsole('tab completion not yet available');
		}
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
				...state.commandHistory,
				{
					content: value,
					id: uuid()
				}
			]
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
