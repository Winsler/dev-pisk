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
    this.components.localSaveBtn = this.node.querySelector('.local-save-btn');
    this.components.localLoadBtn = this.node.querySelector('.local-load-btn');
    this.components.infoSize = this.node.querySelector('.info__size');
    this.components.infoCoords = this.node.querySelector('.info__coords');
    this.components.fileInput = this.node.querySelector('.file-input--hidden');
  }

  render(parent, rect, defaultFPS) {
    super.render(parent, rect);
    this.components.fpsBox.textContent = `${defaultFPS} FPS`;
    this.components.range.value = defaultFPS;
  }
}

export default Preview;
