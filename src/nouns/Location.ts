interface Args {
	slug: string;
	descriptions: string[];
}

export default class Location {
	constructor({ descriptions, slug }: Args) {
		this.descriptions = descriptions;
		this.slug = slug;
	}

	hasNeighbor = (neighbor: string): boolean =>
		this.neighborSlugs.indexOf(neighbor) >= 0;

	hasItem = (item: string): boolean => this.itemSlugs.indexOf(item) >= 0;

	descriptions: string[];
	slug: string;
	itemSlugs: string[] = [];
	neighborSlugs: string[] = [];
}
