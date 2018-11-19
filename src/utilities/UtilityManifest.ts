import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';
import WhoAmI from './WhoAmI';

const UtilityManifest: { [s: string]: typeof BaseUtility } = {
	echo: Echo,
	help: Help,
	ls: Ls,
	whoami: WhoAmI
};

export default UtilityManifest;
