import html from './frameHolderView.html';
import NodeComponentView from '../NodeComponentView/index';
import Frame from './frameView/index';

class FrameHolder extends NodeComponentView {
  constructor() {
    super(html);
    this.frameListNode = this.node.querySelector('.frames-wrapper__list');
    this.style = getComputedStyle(this.node);
    this.components = {
      btn: this.node.querySelector('.frames-wrapper__btn'),
    };
  }

  addFrame() {
    const frame = new Frame({
      parts: 3,
      width: this.style.width,
      height: this.style.height,
    });
    const li = document.createElement('li');
    this.frameListNode.appendChild(li);
    frame.render(li);
    frame.strokeRandomRect();
    window.g = frame;
  }
}

export default FrameHolder;
