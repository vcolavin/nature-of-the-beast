import store from '../store';

const voices = speechSynthesis
	.getVoices()
	.filter(({ lang }) => lang.indexOf('en') >= 0);

// TODO: these voices only exist on Firefox.
const moira = voices.filter(voice => voice.name === 'Moira')[0] || voices[0];
const victoria =
	voices.filter(voice => voice.name === 'Victoria')[0] || voices[0];

export default function say(text: string): Promise<null> {
	if (!store.getState().soundOn) {
		return Promise.resolve(null);
	}

	const utterance = new SpeechSynthesisUtterance(text);

	utterance.pitch = 0.8;
	utterance.rate = 0.9;

	utterance.voice = victoria;

	if (text[0] === '"' && text[text.length - 1] === '"') {
		utterance.pitch = 1;
		utterance.rate = 1;
		utterance.voice = moira;
	}

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
