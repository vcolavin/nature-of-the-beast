// // karen, moira, tessa, Ting-Ting

// const voices = window.speechSynthesis
// 	.getVoices()
// 	.filter(voice => voice.name === 'Ting-Ting');

// voices.reduce((memo, voice): Promise<any> => {
// 	return memo.then(() => {
// 		const utterance = new SpeechSynthesisUtterance(
// 			'this is a test statement. look at the fog. look how it is sad.'
// 		);
// 		utterance.voice = voice;
// 		utterance.rate = 0.8;
// 		utterance.pitch = 0.6;

// 		console.log(voice.name);

// 		window.speechSynthesis.speak(utterance);

// 		return new Promise(resolve => {
// 			utterance.onend = () => {
// 				resolve();
// 			};
// 		});
// 	});
// }, Promise.resolve(null));

const voice =
	window.speechSynthesis
		.getVoices()
		.filter(voice => voice.name === 'Tessa')[0] ||
	window.speechSynthesis.getVoices()[0];

export default function say(text: string): Promise<null> {
	const utterance = new SpeechSynthesisUtterance(text);

	utterance.rate = 0.9;
	utterance.pitch = 0.8;
	utterance.voice = voice;

	window.speechSynthesis.speak(utterance);

	return new Promise(resolve => {
		utterance.onend = () => {
			window.setTimeout(resolve, 300);
		};
	});
}

export function cancelSpeech(): void {
	window.speechSynthesis.cancel();
}
