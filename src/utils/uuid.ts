// simplest UUID implementation
// https://gist.github.com/jed/982883

export default function uuid(a?: number): string {
	return a
		? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
		: (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
