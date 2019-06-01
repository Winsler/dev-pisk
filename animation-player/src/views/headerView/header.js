import html from './header.html';

class Header {
  constructor() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    [this.node] = wrapper.childNodes;
  }

  render(parent) {
    parent.appendChild(this.node);
  }
}

export default Header;
