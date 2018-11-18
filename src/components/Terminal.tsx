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
		}
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (this.inputEl) {
			const val = this.inputEl.value;
			this.inputEl.value = '...';

			window.setTimeout(() => {
				this.setState(
					state => ({
						commandHistory: [
							...state.commandHistory,
							{
								content: val,
								id: uuid()
							}
						],
						terminalHistory: [
							...this.state.terminalHistory,
							{
								content: `you wrote ${val}`,
								id: uuid()
							}
						]
					}),
					() => {
						this.inputEl.value = '';
					}
				);
			}, 300);
		}
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
				<form onSubmit={this.handleSubmit}>
					<input
						ref={e => {
							this.inputEl = e;
							this.inputEl && this.inputEl.focus();
						}}
						className="terminal-input"
						type="text"
					/>
				</form>
			</div>
		);
	}
}
