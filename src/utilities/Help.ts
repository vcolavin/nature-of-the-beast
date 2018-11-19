import BaseUtility from './BaseUtility';
import UtilityManifest from './UtilityManifest';

export default class Help extends BaseUtility {
	static run(_args: string[]): Promise<string> {
		return new Promise(resolve => {
			resolve(
				`the following utilities are available: ${Object.keys(
					UtilityManifest
				).join(', ')}`
			);
		});
	}
}
