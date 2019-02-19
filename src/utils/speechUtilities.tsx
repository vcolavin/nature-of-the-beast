export default function say(text: string): Promise<null> {
	const utterance = new SpeechSynthesisUtterance(text);

	window.speechSynthesis.speak(utterance);

	return new Promise(resolve => {
		utterance.onend = () => {
			window.setTimeout(resolve, 250);
		};
	});
}
