import React from 'react';

import BaseUtility, { PrivateRunParams } from './BaseUtility';
import { TAB_WIDTH } from '../components/Terminal';
import LocationManifest from '../nouns/LocationManifest';

interface Props {
	items: string[];
	places: string[];
}

function LsComponent(props: Props) {
	return (
		<span>
			{props.places.map(place => (
				<span key={place} className="place">
					{place}
					{TAB_WIDTH}
				</span>
			))}
			{props.items.map(item => (
				<span key={item} className="item">
					{item}
					{TAB_WIDTH}
				</span>
			))}
		</span>
	);
}

export default class Ls extends BaseUtility {
	protected _run({
		output,
		state: { location }
	}: PrivateRunParams): Promise<null> {
		output({
			content: (
				<LsComponent
					places={LocationManifest[location].neighborSlugs.sort()}
					items={LocationManifest[location].itemSlugs.sort()}
				/>
			)
		});

		return Promise.resolve(null);
	}

	command = 'list';
	aliases = ['ls'];
	helpDescription =
		'list the locations and objects you can reach from where you are now.';
}
