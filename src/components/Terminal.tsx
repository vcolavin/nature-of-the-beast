import React from 'react';
import { ExtendedUtilityManifest } from '../utilities/UtilityManifest';
import { ActionTypes, RootState, DispatchProps } from '../store';
import { connect } from 'react-redux';
import TerminalBuffer from './TerminalBuffer';
import TerminalInput from './TerminalInput';
import OutputController from '../utils/OutputController';

export type HistoryItemContent = string | JSX.Element;

export interface HistoryItem {
	content: HistoryItemContent;
	id: string;
}

type StoreProps = Pick<RootState, 'consoleInteractive' | 'location'>;

type Props = StoreProps & DispatchProps;

export function inputPrompt(location: string): string {
	return `~/${location} > `;
}

export const TAB_WIDTH = '    ';

class Terminal extends React.Component<Props, {}> {
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
		const { dispatch, location } = this.props;

		const [utilityName, ...args] = value.split(' ');
		const utility = ExtendedUtilityManifest[utilityName];

		OutputController.output(dispatch, {
			content: `${inputPrompt(location)}${value}`
		});

		if (utility) {
			dispatch({ type: ActionTypes.LOCK_CONSOLE });

			utility
				.run({ args, dispatch })
				.then(() => {
					dispatch({ type: ActionTypes.RELEASE_CONSOLE });
				})
				.catch(console.error);
		} else {
			OutputController.output(dispatch, {
				content: `I don't know how to ${utilityName}`
			});
		}
	};

	render() {
		const { consoleInteractive, location } = this.props;

		return (
			<div className="terminal">
				<TerminalBuffer />

				<form
					className={`input-form ${
						consoleInteractive ? 'active' : ''
					}`}
				>
					<span className="input-prompt">
						{inputPrompt(location)}
					</span>

					<TerminalInput handleSubmit={this.runCommand} />
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({
	consoleInteractive,
	location
}: RootState): StoreProps => ({
	consoleInteractive,
	location
});

export default connect(mapStateToProps)(Terminal);
