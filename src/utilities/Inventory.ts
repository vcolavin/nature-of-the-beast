import BaseUtility, { PrivateRunParams } from './BaseUtility';
import store from '../store';
import { TAB_WIDTH } from '../components/Terminal';

export default class Inventory extends BaseUtility {
	_run({ output }: PrivateRunParams): Promise<null> {
		output({ content: store.getState().inventory.join(TAB_WIDTH) });
		return Promise.resolve(null);
	}

	command = 'inventory';
	helpDescription = 'List all the items currently in your inventory.';
	aliases = ['inv'];
}
