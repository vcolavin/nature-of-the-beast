import React from 'react';
import { getCurrentLocation } from '../store';
import { TAB_WIDTH } from './Terminal';
import uuid from '../utils/uuid';

interface CommandItem {
	content: string;
	id: string;
}

interface Props {
	writeToConsole: (arg: string) => void;
	handleSubmit: (arg: string) => void;
}

interface State {
	commandHistory: CommandItem[];
	currentPlaceInHistory: number;
}

export default class TerminalInput extends React.Component<Props, State> {
	state: State = {
		commandHistory: [],
		currentPlaceInHistory: -1
	};

	private inputEl: HTMLInputElement | null = null;

	private focusOnInput = () => {
		if (this.inputEl) {
			this.inputEl.focus();
		}
	};

	componentDidMount() {
		window.addEventListener('click', this.focusOnInput);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.focusOnInput);
	}

	private goBackInHistory = () => {
		this.setState(
			state => {
				if (
					state.currentPlaceInHistory ===
					state.commandHistory.length + 1
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
					this.inputValue = command.content;
				}
			}
		);
	};

	private goForwardInHistory = () => {
		this.setState(
			state => {
				if (state.currentPlaceInHistory === -1) {
					return null;
				}

				return {
					currentPlaceInHistory: state.currentPlaceInHistory - 1
				};
			},
			() => {
				if (this.state.currentPlaceInHistory === -1) {
					this.inputValue = '';
				}

				const command = this.state.commandHistory[
					this.state.currentPlaceInHistory
				];

				if (command) {
					this.inputValue = command.content;
				}
			}
		);
	};

	private moveCursorToEnd = () => {
		window.setTimeout(() => {
			if (this.inputEl) {
				this.inputEl.selectionStart = 1000;
			}
		}, 0);
	};

	private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
				this.addToCommandHistory(this.inputValue);
				this.props.handleSubmit(this.inputValue);
				this.inputValue = '';

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

	private get inputValue(): string {
		return this.inputEl ? this.inputEl.value : '';
	}

	private set inputValue(value: string) {
		if (this.inputEl) {
			this.inputEl.value = value;
		}
	}

	private tabComplete = () => {
		if (this.inputValue === '') {
			return;
		}

		const [command, ...rest] = this.inputValue.split(' ');

		let lastValue = rest[rest.length - 1];

		if (typeof lastValue === 'undefined') {
			lastValue = '';
		}

		const options = [
			...getCurrentLocation().neighborSlugs,
			...getCurrentLocation().itemSlugs
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
				this.inputValue = newValue;
				break;
			default:
				this.props.writeToConsole(
					options.reduce(
						(memo: string, option: string) =>
							`${memo}${TAB_WIDTH}${option}`
					)
				);
				break;
		}
		return;
	};

	render() {
		return (
			<>
				<input
					className="input"
					type="text"
					onKeyDown={this.handleKeyDown}
					ref={e => {
						this.inputEl = e;
						this.inputEl && this.inputEl.focus();
					}}
				/>
			</>
		);
	}
}
