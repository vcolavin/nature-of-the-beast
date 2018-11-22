import BaseLocation from './locations/BaseLocation';

interface BigStateInterface {
	location: typeof BaseLocation;
}

const BigStateObject: BigStateInterface = {
	location: QuietForest
};

export default BigStateObject;
