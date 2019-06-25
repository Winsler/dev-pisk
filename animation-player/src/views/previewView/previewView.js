import html from './previewView.html';
import Canvas from '../Canvas/Canvas';

class Preview extends Canvas {
  constructor(size) {
    super(html, { parts: size });
    this.components.range = this.node.querySelector('input[type=range]');
    this.components.fpsBox = this.node.querySelector('.fps');
    this.components.fullScreenBtn = this.node.querySelector('.full-screen-btn');
    this.components.gifBtn = this.node.querySelector('.get-gif-btn');
    this.components.saveBtn = this.node.querySelector('.save-btn');
    this.components.loadBtn = this.node.querySelector('.load-btn');
  }

  render(parent, rect, defaultFPS) {
    super.render(parent, rect);
    this.components.fpsBox.textContent = `${defaultFPS} FPS`;
    this.components.range.value = defaultFPS;
  }
}

export default Preview;
