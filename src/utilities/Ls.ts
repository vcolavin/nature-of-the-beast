import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';
import { TAB_WIDTH } from '../components/Terminal';

export default class Ls extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		const slugs = [
			...getCurrentLocation().neighborSlugs.sort(),
			...getCurrentLocation().itemSlugs.sort()
		];

		writeToConsole(slugs.join(TAB_WIDTH));

		return Promise.resolve(null);
	}

	command = 'ls';
	helpDescription =
		'ls lists the locations and objects you can reach from where you are now.';
}
