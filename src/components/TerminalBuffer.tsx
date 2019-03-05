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
			{terminalHistory.map(item => (
				<React.Fragment key={item}>
					{OutputController.historyManifest[item]} <br />
				</React.Fragment>
			))}
		</div>
	);
}

function mapStateToProps(state: RootState): Props {
	return { terminalHistory: state.history };
}

export default connect(mapStateToProps)(TerminalBuffer);
