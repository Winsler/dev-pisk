import getEraserHandlers from './eraser/index';
import getBucketHandlers from './bucket/index';
import getRectangleHandlers from './rectangle/index';
import getSameColorPainterHandlers from './paintSame/index';

const getHandlers = {
  eraser: getEraserHandlers,
  bucket: getBucketHandlers,
  rectangle: getRectangleHandlers,
  paintSameColor: getSameColorPainterHandlers,
};

export default getHandlers;
