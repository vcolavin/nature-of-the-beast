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
}

interface IProps {}

export default class Terminal extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state: IState = {
		terminalHistory: [
			{ content: 'welcome to the forest', id: uuid() },
			{ content: 'feel free to look around', id: uuid() }
		],
		commandHistory: []
	};

	private inputEl: HTMLInputElement = null;

	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// console.log('oy');
		// debugger;

		if (this.inputEl) {
			console.log(this.state.commandHistory.length);

			const val = this.inputEl.value;
			this.inputEl.value = '';

			this.setState(state => ({
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
			}));
		}
	}

	render() {
		return (
			<div
				className="terminal"
				onClick={() => {
					this.inputEl && this.inputEl.focus();
				}}
			>
				<pre className="terminal-buffer-list">
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
