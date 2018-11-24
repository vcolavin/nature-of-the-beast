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
	neighbors: Location[] = [];
	slug: string;
}

export const initialLocation = new Location({
	descriptions: [{ text: 'locations are still loading' }],
	slug: 'loading'
});
