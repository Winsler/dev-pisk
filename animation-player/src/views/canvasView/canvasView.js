import html from './canvasView.html';
import NodeComponentView from '../NodeComponentView/index';

class Canvas extends NodeComponentView {
  constructor() {
    super(html);
  }
}

export default Canvas;
