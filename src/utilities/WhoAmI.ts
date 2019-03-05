import BaseUtility, { PrivateRunParams } from './BaseUtility';

const responses: string[] = [
	"I don't remember",
	'But I am glad you asked. I am glad you are here.',
	"I don't know who you are",
	'You are an echo',
	'You were a mistake',
	'You are a dog lover',
	'Or you were'
];

export default class WhoAmI extends BaseUtility {
	_run({ output }: PrivateRunParams): Promise<null> {
		return responses.reduce(
			(memo: Promise<null>, content: string): Promise<null> =>
				memo.then(() => output({ content, speak: true })),
			Promise.resolve(null)
		);
	}

	command = 'whoami';
	helpDescription = 'Ask a difficult question. Get a difficult response';
}
