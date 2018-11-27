import LocationManifest from './LocationManifest';

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
	neighborSlugs: string[] = [];
	slug: string;

	get neighbors(): Location[] {
		return this.neighborSlugs.map(slug => LocationManifest[slug]);
	}
}
