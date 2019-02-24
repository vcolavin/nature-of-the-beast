interface Args {
	slug: string;
	descriptions: string[];
}

export default class Location {
	constructor({ descriptions, slug }: Args) {
		this.descriptions = descriptions;
		this.slug = slug;
	}

	descriptions: string[];
	slug: string;
	itemSlugs: string[] = [];
	neighborSlugs: string[] = [];
}
