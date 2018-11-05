import React from 'react';

export default class Terminal extends React.Component {
	render() {
		return (
			<div className="terminal">
				<ul className="terminal-buffer">
					<li>here's some text</li>
					<li>here's some text</li>
					<li>here's some text</li>
					<li>here's some text</li>
					<li>here's some text</li>
					<li>here's some text</li>
				</ul>
				<input className="terminal-input" type="text" />
			</div>
		);
	}
}
