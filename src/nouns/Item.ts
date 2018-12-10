interface Args {
	slug: string;
	locationSlug: string;
	description: string;
}

export default class Item {
	constructor({ description, slug, locationSlug }: Args) {
		this.description = description;
		this.slug = slug;
		this.locationSlug = locationSlug;
	}

	description: string;
	slug: string;
	locationSlug: string;
}
