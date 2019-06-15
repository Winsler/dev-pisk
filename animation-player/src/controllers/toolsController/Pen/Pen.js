import Tool from '../Tool/index';

class Pen extends Tool {
  constructor(node, handlers = [], cursors = [], shortKey) {
    super(node, handlers, cursors, shortKey);
  }
}

export default Pen;
