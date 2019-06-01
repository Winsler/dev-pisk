import Header from '../headerView/index';

class AppView {
  constructor() {
    this.components = {
      header: new Header(),
    };
  }

  render() {
    const { body } = document;
    this.components.header.render(body);
  }
}

export default AppView;
