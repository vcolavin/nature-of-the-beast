import BaseUtility, { RunParams } from './BaseUtility';
import store, { ActionTypes, getCurrentLocation } from '../store';

export default class Cd extends BaseUtility {
    private goToPreviousLocation() {
        const newLocation = store.getState().previousLocationStack[0];

        store.dispatch({
            type: ActionTypes.POP_LOCATION_STACK
        });

        if (newLocation) {
            store.dispatch({
                type: ActionTypes.SET_LOCATION,
                value: newLocation
            });
        }
    }

    run({ args, writeToConsole }: RunParams): Promise<null> {
        const nullPromise = Promise.resolve(null);

        if (args[0] == '..') {
            this.goToPreviousLocation();
        } else {
            const newLocation = getCurrentLocation().neighborSlugs.find(
                (slug: string) => slug === args[0]
            );

            if (newLocation) {
                store.dispatch({
                    type: ActionTypes.PUSH_LOCATION_STACK,
                    value: store.getState().location
                });

                store.dispatch({
                    type: ActionTypes.SET_LOCATION,
                    value: newLocation
                });
            } else {
                writeToConsole(`invalid location ${args[0]}`);
            }
        }

        setUrlLocation({
            location: store.getState().location
        });

        return nullPromise;
    }

    command = 'cd';
    helpDescription =
        'Use cd to move to a new location. For example:\n\ncd a_cold_cabin';
}

export function setUrlLocation({ location }: { location: string }): void {
    const currentUrl = window.location.href;
    const newUrl =
        currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1) + location;

    window.history.pushState({ path: newUrl }, '', newUrl);
}
