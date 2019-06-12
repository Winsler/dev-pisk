// TODO: унаследоваться от NodeComponentView
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
  }

  render(rect, options) {
    const { body } = document;
    this.components.header.render(body);
    body.appendChild(this.components.layot);
    this.components.tools.render(this.components.layot.querySelector('.tools'));
    this.components.frames.render(this.components.layot.querySelector('.frames'), rect);
    this.components.canvas.render(this.components.layot.querySelector('.canvas'), rect);
    this.components.preview.render(this.components.layot.querySelector('.preview'), rect, options.defaultFPS);
  }
}

export default AppView;
