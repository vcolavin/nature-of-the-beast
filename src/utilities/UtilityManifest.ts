import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';
import WhoAmI from './WhoAmI';
import Pwd from './Pwd';
import Cd from './Cd';

const utilities = [
	new Echo(),
	new Help(),
	new Ls(),
	new WhoAmI(),
	new Cd(),
	new Pwd()
];

const UtilityManifest: { [s: string]: BaseUtility } = {};

utilities.forEach(utility => {
	UtilityManifest[utility.command] = utility;
});

export default UtilityManifest;
