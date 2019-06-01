class Controller {
  constructor(View) {
    this.view = new View();
    // this.model = new Model();
  }

  init() {
    this.view.render();
  }
}

export default Controller;
