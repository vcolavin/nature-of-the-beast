import React from 'react';

import BaseUtility, { RunParams } from './BaseUtility';
import { getCurrentLocation } from '../store';
import { TAB_WIDTH } from '../components/Terminal';

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
	run({ writeToConsole }: RunParams): Promise<null> {
		writeToConsole({
			item: (
				<LsComponent
					places={getCurrentLocation().neighborSlugs.sort()}
					items={getCurrentLocation().itemSlugs.sort()}
				/>
			)
		});

		return Promise.resolve(null);
	}

	command = 'ls';
	helpDescription =
		'ls lists the locations and objects you can reach from where you are now.';
}
