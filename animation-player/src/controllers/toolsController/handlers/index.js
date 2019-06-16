import getEraserHandlers from './eraser/index';
import getBucketHandlers from './bucket/index';

const getHandlers = {
  eraser: getEraserHandlers,
  bucket: getBucketHandlers,
};

export default getHandlers;
