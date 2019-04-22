import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { TAB_WIDTH } from '../components/Terminal';

export default class Inventory extends BaseUtility {
	protected _run({
		output,
		state: { inventory }
	}: PrivateRunParams): Promise<null> {
		output({ content: inventory.join(TAB_WIDTH) });
		return Promise.resolve(null);
	}

	command = 'inventory';
	helpDescription = 'List all the items currently in your inventory.';
	aliases = ['inv'];
}
