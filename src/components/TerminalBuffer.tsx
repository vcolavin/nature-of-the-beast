import React from 'react';
import { HistoryItem } from './Terminal';

interface Props {
	terminalHistory: HistoryItem[];
}

export default class TerminalBuffer extends React.Component<Props, {}> {
	render() {
		return (
			<div>
				{this.props.terminalHistory.map(item => {
					return (
						<span key={item.id}>
							{item.content} <br />
						</span>
					);
				})}
			</div>
			// <pre className="terminal-buffer">
			// 	{this.props.terminalHistory.reduce(
			// 		(memo, historyItem) => `${memo}\n${historyItem.content}`,
			// 		''
			// 	)}
			// </pre>
		);
	}
}
