import React from 'react';
import { RootState } from '../store';
import { connect } from 'react-redux';
import OutputController from '../utils/OutputController';

interface Props {
	terminalHistory: string[];
}

function TerminalBuffer({ terminalHistory }: Props) {
	return (
		<div className="terminal-buffer">
			{terminalHistory.map(itemId => (
				<p className="terminal-buffer-item" key={itemId}>
					{OutputController.historyManifest[itemId]}
				</p>
			))}
		</div>
	);
}

function mapStateToProps({ history }: RootState): Props {
	return { terminalHistory: history };
}

export default connect(mapStateToProps)(TerminalBuffer);
