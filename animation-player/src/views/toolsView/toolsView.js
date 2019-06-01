import html from './toolsView.html';

class Tools {
  constructor() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    [this.node] = wrapper.childNodes;
  }

  render(parent) {
    parent.appendChild(this.node);
  }
}

export default Tools;
