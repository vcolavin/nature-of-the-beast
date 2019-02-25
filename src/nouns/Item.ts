interface Args {
	slug: string;
	locationSlug: string;
	descriptions: string[];
}

export default class Item {
	constructor({ descriptions, slug, locationSlug }: Args) {
		this.descriptions = descriptions;
		this.slug = slug;
		this.locationSlug = locationSlug;
	}

	descriptions: string[];
	slug: string;
	locationSlug: string;
}
