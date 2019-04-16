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

	descriptions: string[];
	slug: string;
	locationSlug: string;
	takeable: boolean;
}
