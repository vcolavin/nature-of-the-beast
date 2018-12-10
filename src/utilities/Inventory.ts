import BaseUtility, { RunParams } from './BaseUtility';
import store from '../store';
import { TAB_WIDTH } from '../components/Terminal';

export default class Inventory extends BaseUtility {
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole(store.getState().inventory.join(TAB_WIDTH));
		return Promise.resolve(null);
	}

	command = 'inv';
	helpDescription = 'List all the items currently on you';
}
