interface args {
	slug: string;
	description: string;
}

export default class Location {
	constructor({ description, slug }: args) {
		this.description = description;
		this.slug = slug;
	}

	description: string;
	neighbors: Location[] = [];
	slug: string;
}
