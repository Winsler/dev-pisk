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

  addFrame(rect, index) {
    const frame = new Frame(null, rect, {
      parts: this.options.size,
      width: parseFloat(this.style.width),
      height: parseFloat(this.style.height),
    });
    frame.setIndex(index);
    const li = document.createElement('li');
    this.components.frameList.appendChild(li);
    frame.render(li);
  }

  render(parent, rect) {
    super.render(parent);
    this.addFrame(rect, 1);
  }

  recalcIndexes() {
    const frames = this.components.frameList.querySelectorAll('li');
    frames.forEach((el, index) => {
      const currEl = el;
      currEl.querySelector('.frame__tool--counter i').textContent = index + 1;
    });
  }
}

export default FrameHolder;
