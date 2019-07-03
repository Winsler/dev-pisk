import Header from '../headerView/index';
import Tools from '../toolsView/index';
import FrameHolder from '../frameHolderView/index';
import CanvasMain from '../canvasView/index';
import Preview from '../previewView/index';
import html from './appView.html';

class AppView {
  constructor(size) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.components = {
      header: new Header(),
      tools: new Tools(),
      frames: new FrameHolder(size),
      canvas: new CanvasMain(size),
      preview: new Preview(size),
      layot: wrapper.childNodes[0],
    };
    this.node = document.body;
  }

  render(rect, options) {
    this.components.header.render(this.node);
    this.node.appendChild(this.components.layot);
    this.components.tools.render(this.components.layot.querySelector('.tools'));
    this.components.frames.render(this.components.layot.querySelector('.frames'), rect);
    this.components.canvas.render(this.components.layot.querySelector('.canvas'), rect);
    this.components.preview.render(this.components.layot.querySelector('.preview'), rect, options.defaultFPS);
  }

  paintImage(image) {
    this.components.canvas.paintImage(image);
  }

  paintPath(corrds1, coords2, color, color2) {
    this.components.canvas.strokePath(corrds1, coords2, color, color2);
  }

  resize() {
    const height = parseFloat(document.documentElement.clientHeight)
    - parseFloat(getComputedStyle(this.components.header.node).height)
    - parseFloat(getComputedStyle(document.querySelector('.layout')).paddingTop);
    this.components.canvas.node.style.height = `${height}px`;
  }
}

export default AppView;
