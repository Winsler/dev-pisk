import NodeComponentView from '../NodeComponentView/index';
import html from './startPageView.html';

export default class StartPageView extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      startBtn: this.node.querySelector('.start-btn'),
      canvasSize: this.node.querySelector('#canvasSize'),
    };
  }
}
