interface args {
	slug: string;
	description: string;
}

export default class BaseLocation {
	constructor({ description, slug }: args) {
		this.description = description;
		this.slug = slug;
	}

	description: string;
	neighbors: BaseLocation[];
	slug: string;
}
