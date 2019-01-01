import React from 'react';
import { HistoryItem } from './Terminal';

interface Props {
	terminalHistory: HistoryItem[];
}

export default class TerminalBuffer extends React.Component<Props, {}> {
	render() {
		return (
			<div className="terminal-buffer">
				{this.props.terminalHistory.map(item => (
					<React.Fragment key={item.id}>
						{item.content} <br />
					</React.Fragment>
				))}
			</div>
		);
	}
}
