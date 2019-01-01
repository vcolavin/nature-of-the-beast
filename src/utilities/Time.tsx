import React from 'react';

import BaseUtility, { RunParams } from './BaseUtility';

interface State {
	content: string;
}

class TimeComponent extends React.Component<{}, State> {
	private interval: number = 0;

	state: State = {
		content: 'initial content'
	};

	componentDidMount() {
		this.interval = window.setInterval(() => {
			this.setState({ content: new Date().getTime().toString() });
		}, 1000);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		return <span>{this.state.content}</span>;
	}
}

export default class Time extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole(<TimeComponent />);

		return Promise.resolve(null);
	}

	command = 'time';
	helpDescription = 'time tells you the time';
}
