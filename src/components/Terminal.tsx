import React from 'react';
import uuid from '../utils/uuid';

interface IBufferItem {
	content: string;
	id: string;
}

interface IState {
	bufferItems: IBufferItem[];
}

interface IProps {}

export default class Terminal extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	state: IState = {
		bufferItems: [
			{ content: 'test1', id: uuid() },
			{ content: 'test2', id: uuid() }
		]
	};

	private inputEl: HTMLInputElement = null;

	private onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (this.inputEl) {
			this.setState(
				state => ({
					bufferItems: [
						...state.bufferItems,
						{
							content: this.inputEl.value,
							id: uuid()
						}
					]
				}),
				() => {
					this.inputEl.value = '';
				}
			);
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
				<ul className="terminal-buffer-list">
					{this.state.bufferItems.map(bufferItem => (
						<li
							className="terminal-buffer-list-item"
							key={bufferItem.id}
						>
							{bufferItem.content}
						</li>
					))}
				</ul>
				<form onSubmit={this.onSubmit}>
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
