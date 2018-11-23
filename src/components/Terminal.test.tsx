import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from './Terminal';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Terminal />, div);
	ReactDOM.unmountComponentAtNode(div);
});

xit('empties the input field on submit', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Terminal />, div);

	const input = document.querySelectorAll('.input')[0];
	const submitEvent = new Event('submit');

	console.log(document.querySelectorAll('.input'));

	input.nodeValue = 'test1';
	input.dispatchEvent(submitEvent);

	expect(input.nodeValue).toBe('');

	ReactDOM.unmountComponentAtNode(div);
});

xit('goes back in history on keyup', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Terminal />, div);

	const input = document.querySelectorAll('.input')[0];

	const submitEvent = new Event('submit');

	input.nodeValue = 'test1';
	input.dispatchEvent(submitEvent);

	input.dispatchEvent(new KeyboardEvent('keypress', { key: 'ArrowUp' }));

	expect(input.nodeValue).toBe('test1');
});
