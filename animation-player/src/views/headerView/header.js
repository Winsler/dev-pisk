import html from './header.html';
import NodeComponentView from '../NodeComponentView/index';

class Header extends NodeComponentView {
  constructor() {
    super(html);
  }
}

export default Header;
