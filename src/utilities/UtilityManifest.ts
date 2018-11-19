import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';
import WhoAmI from './WhoAmI';
import Pwd from './Pwd';

const UtilityManifest: { [s: string]: typeof BaseUtility } = {
	echo: Echo,
	help: Help,
	ls: Ls,
	whoami: WhoAmI,
	cd: Cd,
	pwd: Pwd
};

export default UtilityManifest;
