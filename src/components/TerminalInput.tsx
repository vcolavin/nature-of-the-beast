import React from 'react';
import { DispatchProps, RootState } from '../store';
import { TAB_WIDTH, inputPrompt } from './Terminal';
import uuid from '../utils/uuid';
import OutputController from '../utils/OutputController';
import { ExtendedUtilityManifest } from '../utilities/UtilityManifest';
import { connect } from 'react-redux';
import LocationManifest from '../nouns/LocationManifest';
import Item from '../nouns/Item';

interface CommandItem {
	content: string;
	id: string;
}

interface OwnProps {
	handleSubmit: (arg: string) => void;
}

type StoreProps = Pick<RootState, 'items' | 'location'> & {
	_state: RootState;
};

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
	commandHistory: CommandItem[];
	currentPlaceInHistory: number;
	inputValue: string;
}

class TerminalInput extends React.Component<Props, State> {
	state: State = {
		commandHistory: [],
		currentPlaceInHistory: -1,
		inputValue: ''
	};

	constructor(props: Props) {
		super(props);
		this.inputEl = React.createRef();
	}

	private inputEl: React.RefObject<HTMLInputElement>;

	private focusInput = () => {
		this.inputEl.current && this.inputEl.current.focus();
	};

	componentDidMount() {
		window.addEventListener('click', this.focusInput);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.focusInput);
	}

	private goBackInHistory = () => {
		this.setState(
			(state) => {
				if (
					state.currentPlaceInHistory ===
					state.commandHistory.length - 1
				) {
					return null;
				}

				return {
					currentPlaceInHistory: state.currentPlaceInHistory + 1
				};
			},
			() => {
				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.setState({ inputValue: command.content });
				}
			}
		);
	};

	private goForwardInHistory = () => {
		this.setState(
			(state) => {
				if (state.currentPlaceInHistory === -1) {
					return null;
				}

				return {
					currentPlaceInHistory: state.currentPlaceInHistory - 1
				};
			},
			() => {
				if (this.state.currentPlaceInHistory === -1) {
					this.setState({ inputValue: '' });
				}

				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.setState({ inputValue: command.content });
				}
			}
		);
	};

	private moveCursorToEnd = () => {
		window.setTimeout(() => {
			if (this.inputEl.current) {
				this.inputEl.current.selectionStart = 1000;
			}
		}, 0);
	};

	private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ inputValue: (e.target as HTMLInputElement).value });
	};

	private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'ArrowUp':
				this.goBackInHistory();
				this.moveCursorToEnd();
				break;
			case 'ArrowDown':
				this.goForwardInHistory();
				this.moveCursorToEnd();
				break;
			case 'Tab':
				e.preventDefault();
				this.tabComplete();
				break;
			case 'Enter':
				e.preventDefault();
				this.addToCommandHistory(this.state.inputValue);
				this.props.handleSubmit(this.state.inputValue);
				this.setState({ inputValue: '' });

			default:
		}
	};

	private addToCommandHistory = (value: string) => {
		this.setState(state => ({
			commandHistory: [
				{
					content: value,
					id: uuid()
				},
				...state.commandHistory
			],
			currentPlaceInHistory: -1
		}));
	};

	private tabComplete = () => {
		const [command, ...rest] = this.state.inputValue.split(' ');

		if (rest.length === 0) {
			return;
		}

		const lastValue = rest[rest.length - 1] || '';

		const utility = ExtendedUtilityManifest[command];

		const { _state, items, location: locationString } = this.props;
		const location = LocationManifest[locationString];

		const options =
			utility && utility.getTabCompleteOptions
				? utility.getTabCompleteOptions(_state, lastValue)
				: [
						...location.neighborSlugs,
						...location.itemSlugs,
						...Item.getInventory(items).map(({ slug }) => slug)
				  ].filter((slug: string) => slug.indexOf(lastValue) === 0);

		switch (options.length) {
			case 0:
				break;
			case 1:
				const newValue = [
					command,
					...rest.slice(0, rest.length - 1),
					options[0]
				].join(' ');
				this.setState({ inputValue: newValue });
				break;
			default:
				const { dispatch } = this.props;
				OutputController.output(dispatch, {
					content: `${inputPrompt(locationString)}${
						this.state.inputValue
					}`
				});
				OutputController.output(dispatch, {
					content: options.join(TAB_WIDTH)
				});
				break;
		}
	};

	render() {
		return (
			<input
				className="input"
				type="text"
				onKeyDown={this.handleKeyDown}
				onChange={this.handleChange}
				ref={this.inputEl}
				value={this.state.inputValue}
			/>
		);
	}
}

const mapStateToProps = (
	state: RootState,
	{ handleSubmit }: OwnProps
): OwnProps & StoreProps => ({
	_state: state,
	location: state.location,
	items: state.items,
	handleSubmit
});

export default connect(mapStateToProps)(TerminalInput);
