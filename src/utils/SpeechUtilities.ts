export default function say(text: string): Promise<null> {
	const utterance = new SpeechSynthesisUtterance(text);

	utterance.rate = 0.9;
	utterance.pitch = 0.8;

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
