import html from './frameView.html';
import Canvas from '../../Canvas/Canvas';

class Frame extends Canvas {
  constructor(h, options) {
    super(html, options);
  }
}

export default Frame;
