import getEraserHandlers from './eraser/index';
import getBucketHandlers from './bucket/index';
import getRectangleHandlers from './rectangle/index';
import getSameColorPainterHandlers from './paintSame/index';
import getMirrorPenHandlers from './mirrorPen/index';
import getPipetteHandlers from './pipette/index';

const getHandlers = {
  eraser: getEraserHandlers,
  bucket: getBucketHandlers,
  rectangle: getRectangleHandlers,
  paintSameColor: getSameColorPainterHandlers,
  mirrorPen: getMirrorPenHandlers,
  pipette: getPipetteHandlers,
};

export default getHandlers;
