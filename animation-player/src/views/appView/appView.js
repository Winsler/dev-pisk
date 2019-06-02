// TODO: унаследоваться от NodeComponentView
import Header from '../headerView/index';
import Tools from '../toolsView/index';
import FrameHolder from '../frameHolderView/index';
import CanvasMain from '../canvasView/index';
import html from './appView.html';

class AppView {
  constructor() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.components = {
      header: new Header(),
      tools: new Tools(),
      frames: new FrameHolder(),
      canvas: new CanvasMain(),
      layot: wrapper.childNodes[0],
    };
  }

  render() {
    const { body } = document;
    this.components.header.render(body);
    body.appendChild(this.components.layot);
    this.components.tools.render(this.components.layot.querySelector('.tools'));
    this.components.frames.addFrame();
    this.components.frames.render(this.components.layot.querySelector('.frames'));
    this.components.canvas.render(this.components.layot.querySelector('.canvas'));
  }
}

export default AppView;
