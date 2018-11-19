import Echo from './Echo';
import Help from './Help';
import BaseUtility from './BaseUtility';
import Ls from './Ls';

const manifest: { [s: string]: typeof BaseUtility } = {
	echo: Echo,
	help: Help,
	ls: Ls
};

export default manifest;
