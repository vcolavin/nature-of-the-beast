import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { TAB_WIDTH } from '../components/Terminal';
import { INVENTORY } from '../store';

export default class Inventory extends BaseUtility {
	protected _run({
		output,
		state: { items }
	}: PrivateRunParams): Promise<null> {
		output({ content: items.filter({location} => location === INVENTORY).join(TAB_WIDTH) });
		return Promise.resolve(null);
	}

	command = 'inventory';
	helpDescription = 'List all the items currently in your inventory.';
	aliases = ['inv'];
}
