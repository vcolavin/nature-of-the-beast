import BaseLocation from './locations/BaseLocation';
import QuietForest from './locations/QuietForest';

interface BigStateInterface {
	location: typeof BaseLocation;
	path: typeof BaseLocation[];
}

const BigStateObject: BigStateInterface = {
	location: QuietForest,
	path: []
};

export default BigStateObject;
