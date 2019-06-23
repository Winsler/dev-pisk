import html from './frameView.html';
import Canvas from '../../Canvas/Canvas';

class Frame extends Canvas {
  constructor(h, imageMatrix, options) {
    super(html, options, imageMatrix);
    this.components.popup = {
      counter: this.node.querySelector('.frame__tool--counter'),
      bucket: this.node.querySelector('.frame__tool--bucket'),
      dublicate: this.node.querySelector('.frame__tool--dublicate'),
    };
    this.components.frame = this.node.querySelector('.frame');
  }

  render(parent) {
    super.render(parent, this.state.imageMatrix);
    this.components.canvasNode.linkToFrameClass = this;
    const canvasStyle = getComputedStyle(this.components.frame);
    this.node.style.width = canvasStyle.width;
    this.node.style.height = canvasStyle.height;
  }

  paintIamge() {
    super.paintImage(this.state.imageMatrix);
  }

  setIndex(index) {
    this.components.popup.counter.querySelector('i').textContent = index;
  }

  paintState() {
    this.paintIamge();
  }

  enable() {
    this.components.frame.classList.add('frame--active');
  }

  disable() {
    this.components.frame.classList.remove('frame--active');
  }
}

export default Frame;
