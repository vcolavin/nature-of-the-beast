import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';
import WhoAmI from './WhoAmI';
import Pwd from './Pwd';
import Cd from './Cd';

const UtilityManifest: { [s: string]: BaseUtility } = {};

let hasRun: boolean = false;

export function initializeUtilities() {
	if (hasRun) {
		return;
	}

	hasRun = true;

	const utilities = [
		new Echo(),
		new Help(),
		new Ls(),
		new WhoAmI(),
		new Cd(),
		new Pwd()
	];

	utilities.forEach(utility => {
		UtilityManifest[utility.command] = utility;
	});
}

export default UtilityManifest;
