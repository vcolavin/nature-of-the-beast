import React from 'react';
import { HistoryItem } from './Terminal';

interface Props {
	terminalHistory: HistoryItem[];
}

export default function TerminalBuffer({ terminalHistory }: Props) {
	return (
		<div className="terminal-buffer">
			{terminalHistory.map(item => (
				<React.Fragment key={item.id}>
					{item.content} <br />
				</React.Fragment>
			))}
		</div>
	);
}
