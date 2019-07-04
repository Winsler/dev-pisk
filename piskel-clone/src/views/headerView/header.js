import html from './header.html';
import NodeComponentView from '../NodeComponentView/index';

class Header extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      user: this.node.querySelector('.user'),
    };
  }
}

export default Header;
