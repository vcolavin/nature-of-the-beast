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
	}

	state: IState = {
		bufferItems: [
			{ content: 'test1', id: uuid() },
			{ content: 'test2', id: uuid() }
		]
	};

	private inputEl: HTMLInputElement = null;

	render() {
		return (
			<div className="terminal">
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
				<form
					onSubmit={e => {
						e.preventDefault();
						console.log(this.inputEl.value);
					}}
				>
					<input
						ref={e => {
							if (e) {
								e.focus();
								this.inputEl = e;
							}
						}}
						className="terminal-input"
						type="text"
					/>
				</form>
			</div>
		);
	}
}
