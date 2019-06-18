import getEraserHandlers from './eraser/index';
import getBucketHandlers from './bucket/index';
import getRectangleHandlers from './rectangle/index';

const getHandlers = {
  eraser: getEraserHandlers,
  bucket: getBucketHandlers,
  rectangle: getRectangleHandlers,
};

export default getHandlers;
