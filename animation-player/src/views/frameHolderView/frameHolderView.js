import html from './frameHolderView.html';
import NodeComponentView from '../NodeComponentView/index';
import Frame from './frameView/index';

class FrameHolder extends NodeComponentView {
  constructor(size) {
    super(html);
    this.style = getComputedStyle(this.node);
    this.components = {
      btn: this.node.querySelector('.frames-wrapper__btn'),
      frameList: this.node.querySelector('.frames-wrapper__list'),
    };
    this.options = {
      size,
    };
    window.g = this;
  }

  addFrame(rect) {
    const frame = new Frame(null, rect, {
      parts: this.options.size,
      width: parseFloat(this.style.width),
      height: parseFloat(this.style.height),
    });
    const li = document.createElement('li');
    this.components.frameList.appendChild(li);
    frame.render(li);
  }

  render(parent, rect) {
    super.render(parent);
    this.addFrame(rect);
  }
}

export default FrameHolder;
