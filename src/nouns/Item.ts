import { INVENTORY } from '../store';

interface Args {
	slug: string;
	locationSlug: string;
	descriptions: string[];
	takeable: boolean;
}

export default class Item {
	constructor({ descriptions, slug, locationSlug, takeable }: Args) {
		this.descriptions = descriptions;
		this.slug = slug;
		this.locationSlug = locationSlug;
		this.takeable = takeable;
	}

	static getInventory = (items: { [key: string]: Item }) =>
		Object.keys(items)
			.map((key) => items[key])
			.filter(({ locationSlug }) => locationSlug === INVENTORY);

	descriptions: string[];
	slug: string;
	locationSlug: string;
	takeable: boolean;
}
