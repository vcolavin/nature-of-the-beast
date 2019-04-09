import React from 'react';
import uuid from '../utils/uuid';
import UtilityManifest from '../utilities/UtilityManifest';
import store, { ActionTypes, RootState } from '../store';
import { connect } from 'react-redux';
import TerminalBuffer from './TerminalBuffer';
import TerminalInput from './TerminalInput';
import OutputController from '../utils/OutputController';

export type HistoryItemContent = string | JSX.Element;

export interface HistoryItem {
	content: HistoryItemContent;
	id: string;
}

interface TerminalProps {
	consoleInteractive: boolean;
}

function inputPrompt(): string {
	return `~/${store.getState().location} > `;
}

export const TAB_WIDTH = '    ';

class Terminal extends React.Component<TerminalProps, {}> {
	private handleKeydown = (e: Event) => {
		const typedEvent = (e as any) as React.KeyboardEvent;

		const { key } = typedEvent;

		if (
			key === 'Escape' ||
			(typedEvent.ctrlKey && ['c', 'C', 'd', 'D'].indexOf(key) >= 0)
		) {
			OutputController.stopOutput();
		}
	};

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	private runCommand = (value: string) => {
		const [utilityName, ...args] = value.split(' ');

		const utility = UtilityManifest[utilityName];

		OutputController.output({ content: `${inputPrompt()}${value}` });

		if (utility) {
			store.dispatch({ type: ActionTypes.LOCK_CONSOLE });

			utility
				.run({
					args
				})
				.then(() => {
					store.dispatch({ type: ActionTypes.RELEASE_CONSOLE });
				})
				.catch(console.error);
		} else {
			OutputController.output({
				content: `I don't know how to ${utilityName}`
			});
		}
	};

	render() {
		const { consoleInteractive } = this.props;

		return (
			<div className="terminal">
				<TerminalBuffer />

				<form
					className={`input-form ${
						consoleInteractive ? 'active' : ''
					}`}
				>
					<span className="input-prompt">{inputPrompt()}</span>

					<TerminalInput handleSubmit={this.runCommand} />
				</form>
			</div>
		);
	}
}

function mapStateToProps(state: RootState): TerminalProps {
	return { consoleInteractive: state.consoleInteractive };
}

export default connect(mapStateToProps)(Terminal);
