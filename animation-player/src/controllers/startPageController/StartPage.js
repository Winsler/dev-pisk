export default class StartPageController {
  constructor(StartPageView) {
    this.view = new StartPageView();
  }

  init() {
    const { body } = document;
    this.view.render(body);
  }
}
