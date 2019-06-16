import html from './toolsView.html';
import NodeComponentView from '../NodeComponentView/index';

class Tools extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      colorPicker: this.node.querySelector('.color-picker'),
    };
  }
}

export default Tools;
