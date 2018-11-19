import Echo from './Echo';
import BaseUtility from './BaseUtility';

const manifest: { [s: string]: typeof BaseUtility } = {
	echo: Echo
};

export default manifest;
