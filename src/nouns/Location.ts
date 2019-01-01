interface Description {
	text: string;
	timer?: number;
}

interface Args {
	slug: string;
	descriptions: Description[];
}

export default class Location {
	constructor({ descriptions, slug }: Args) {
		this.descriptions = descriptions;
		this.slug = slug;
	}

	descriptions: Description[];
	slug: string;
	itemSlugs: string[] = [];
	neighborSlugs: string[] = [];
}
