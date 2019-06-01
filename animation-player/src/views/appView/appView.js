import Header from '../headerView/index';
import Tools from '../toolsView/index';
import html from './appView.html';

class AppView {
  constructor() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.components = {
      header: new Header(),
      tools: new Tools(),
      layot: wrapper.childNodes[0],
    };
  }

  render() {
    const { body } = document;
    this.components.header.render(body);
    body.appendChild(this.components.layot);
    this.components.tools.render(this.components.layot.querySelector('.tools'));
  }
}

export default AppView;
