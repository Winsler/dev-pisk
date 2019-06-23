import html from './toolsView.html';
import NodeComponentView from '../NodeComponentView/index';

class Tools extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      palette: this.node.querySelector('.palette'),
      mainColorPicker: this.node.querySelector('[data-tool-type="mainColorPicker"]'),
      subColorPicker: this.node.querySelector('[data-tool-type="subColorPicker"]'),
      eraser: this.node.querySelector('[data-tool-type=eraser]'),
      pen: this.node.querySelector('[data-tool-type=pen]'),
      bucket: this.node.querySelector('[data-tool-type=bucket]'),
      rectangle: this.node.querySelector('[data-tool-type=rectangle]'),
      mirrorPen: this.node.querySelector('[data-tool-type=mirrorPen]'),
      pipette: this.node.querySelector('[data-tool-type=pipette]'),
      lighten: this.node.querySelector('[data-tool-type=lighten]'),
      sameColorPainter: this.node.querySelector('[data-tool-type=paintSameColor]'),
    };
  }
}

export default Tools;
