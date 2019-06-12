import startAnimation from './utils/animation/animation';
import renderViewWithRandomRect from './utils/misc/index';
import handlers from './utils/handlers/index';

class Controller {
  constructor(View, Model, size) {
    this.view = new View(size);
    this.model = new Model(size);
    this.state = {
      rects: [],
      timer: null,
    };
    this.options = {
      defaultFPS: 5,
    };
  }

  init() {
    renderViewWithRandomRect.call(this);
    const startAnimationBinded = startAnimation.bind(this);

    this.view.components.frames.components.btn.addEventListener('click', handlers.frame.addFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('mouseover', handlers.frame.showFramePopup);
    this.view.components.frames.components.frameList.addEventListener('click', handlers.frame.frameActions.bind(this, startAnimationBinded));

    this.view.components.preview.components.range.addEventListener('change', handlers.preview.changeFPS.bind(this, startAnimationBinded));
    this.view.components.preview.components.range.addEventListener('input', handlers.preview.changeRange.bind(this));
    this.view.components.preview.components.fullScreenBtn.addEventListener('click', handlers.preview.fullScreenMode.bind(this));

    startAnimationBinded();
  }
}

export default Controller;
