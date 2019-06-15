import Pen from './Pen';
import getPenHandlers from './handlers/index';

const pen = {
  Tool: Pen,
  getHandlers: getPenHandlers,
};

export default pen;
