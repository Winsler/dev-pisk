import html from './frameHolderView.html';
import NodeComponentView from '../NodeComponentView/index';
import Frame from './frameView/index';

class FrameHolder extends NodeComponentView {
  constructor() {
    super(html);
    this.frameListNode = this.node.querySelector('.frames-wrapper__list');
  }

  addFrame() {
    const frame = new Frame();
    const li = document.createElement('li');
    li.appendChild(frame.node);
    this.frameListNode.appendChild(li);
  }
}

export default FrameHolder;
