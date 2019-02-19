const { speak } = window.speechSynthesis;

export default function say(text: string): Promise<void> {
	const utterance = new SpeechSynthesisUtterance(text);

	speak(utterance);

	return new Promise(resolve => {
		utterance.onend = () => {
			resolve();
		};
	});
}
