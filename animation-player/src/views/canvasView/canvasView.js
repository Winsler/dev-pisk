import html from './canvasView.html';
import Canvas from '../Canvas/Canvas';

class CanvasMain extends Canvas {
  constructor(size) {
    super(html, { parts: size });
  }
}

export default CanvasMain;
