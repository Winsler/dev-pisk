import html from './frameView.html';
import Canvas from '../../Canvas/Canvas';

class Frame extends Canvas {
  constructor(h, colors, options) {
    super(html, options, colors);
    /*
    this.state = {
      colors,
    };
    */
    this.components.popup = {
      counter: this.node.querySelector('.frame__tool--counter'),
      bucket: this.node.querySelector('.frame__tool--bucket'),
      dublicate: this.node.querySelector('.frame__tool--dublicate'),
    };
  }

  showPopup() {
    const display = 'flex';
    this.components.popup.counter.style.display = display;
    this.components.popup.bucket.style.display = display;
    this.components.popup.dublicate.style.display = display;
  }

  hidePopup() {
    this.components.popup.counter.style.display = '';
    this.components.popup.bucket.style.display = '';
    this.components.popup.dublicate.style.display = '';
  }

  render(parent) {
    super.render(parent, this.state.colors);
    this.components.canvasNode.linkToFrameClass = this;
  }

  strokeRect() {
    super.strokeRect(this.state.colors);
  }

  setIndex(index) {
    this.components.popup.counter.querySelector('i').textContent = index;
  }

  refreshCanvas() {
    this.strokeRect();
  }
}

export default Frame;
