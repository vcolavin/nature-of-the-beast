import BaseLocation from './locations/BaseLocation';
import QuietForest from './locations/QuietForest';

interface BigStateInterface {
	location: typeof BaseLocation;
}

const BigStateObject: BigStateInterface = {
	location: QuietForest
};

export default BigStateObject;
