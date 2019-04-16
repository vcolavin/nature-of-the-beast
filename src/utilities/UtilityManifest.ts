import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';
import WhoAmI from './WhoAmI';
import Look from './Look';
import Cd from './Cd';
import Time from './Time';
import Pickup from './Pickup';
import Inventory from './Inventory';
import Mute from './Mute';
import Clear from './Clear';

export const UtilityManifest: { [s: string]: BaseUtility } = {};
export const ExtendedUtilityManifest: { [s: string]: BaseUtility } = {};

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
		new Look(),
		new Time(),
		new Pickup(),
		new Inventory(),
		new Mute(),
		new Clear()
	];

	utilities.forEach(utility => {
		UtilityManifest[utility.command] = utility;

		ExtendedUtilityManifest[utility.command] = utility;

		utility.aliases.forEach(alias => {
			ExtendedUtilityManifest[alias] = utility;
		});
	});
}
