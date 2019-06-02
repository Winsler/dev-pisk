class Controller {
  constructor(View) {
    this.view = new View();
    // this.model = new Model();
  }

  init() {
    this.view.render();
    this.view.components.frames.components.btn.addEventListener('click',
      () => {
        this.view.components.frames.addFrame();
      });
  }
}

export default Controller;
