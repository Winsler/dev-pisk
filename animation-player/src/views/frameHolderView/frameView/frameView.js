import html from './frameView.html';
import NodeComponentView from '../../NodeComponentView/index';

class Frame extends NodeComponentView {
  constructor() {
    super(html);
  }
}

export default Frame;
