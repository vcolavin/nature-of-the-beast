import store from '../store';

const voices = speechSynthesis.getVoices();

export default function say(text: string): Promise<null> {
	const utterance = new SpeechSynthesisUtterance(text);

	utterance.rate = 0.9;
	utterance.pitch = 0.8;
	utterance.volume = store.getState().soundOn ? 1 : 0;

	utterance.voice = voices[0];

	if (text[0] === '"' && text[text.length - 1] === '"') {
		utterance.voice =
			voices.filter(voice => voice.name === 'Karen')[0] || voices[0];
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
