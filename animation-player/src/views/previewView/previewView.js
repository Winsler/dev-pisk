import html from './previewView.html';
import Canvas from '../Canvas/Canvas';

class Preview extends Canvas {
  constructor(size) {
    super(html, { parts: size });
    this.components.range = this.node.querySelector('input[type=range]');
    this.components.fpsBox = this.node.querySelector('.fps');
    this.components.fullScreenBtn = this.node.querySelector('.full-screen-btn');
  }
}

export default Preview;
