import Echo from './Echo';

it('tries to print the arguments', () => {
	const echo = new Echo();

	const writeToConsole = jest.fn();

	echo.run({ args: ['test1', 'test2'], writeToConsole });

	expect(writeToConsole).toBeCalledWith('test1 test2');
});
