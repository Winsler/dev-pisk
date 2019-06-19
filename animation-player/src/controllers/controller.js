import startAnimation from './utils/animation/animation';
import renderViewWithRandomRect from './utils/misc/index';
import handlers from './utils/handlers/index';
import ToolsController from './toolsController/index';
import List from '../utils/List/index';

class Controller {
  constructor(View, Model, size) {
    this.view = new View(size);
    this.model = new Model(size);
    this.options = {
      defaultFPS: 5,
    };
    this.state = {
      parts: size,
      rects: [],
      activeRect: null,
      activeFrame: null,
      timer: null,
      fps: this.options.defaultFPS,
      mainCanvasSize: null,
      view: this.view,
      currColor: '#000',
      liveRects: this.view.components.frames.getItemsLiveList(),
      history: new List(),
    };
    this.tools = new ToolsController(this);
  }

  init() {
    renderViewWithRandomRect.call(this);
    const startAnimationBinded = startAnimation.bind(this);

    this.view.components.frames.components.btn.addEventListener('click', handlers.frame.addFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('click', handlers.frame.frameActions.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragstart', handlers.frame.drafFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragover', e => e.preventDefault());
    this.view.components.frames.components.frameList.addEventListener('dragenter', handlers.frame.dragEnterFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragleave', handlers.frame.dragLeaveFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('drop', handlers.frame.dropFrame.bind(this));

    this.view.components.preview.components.range.addEventListener('input', handlers.preview.changeFPS.bind(this));
    this.view.components.preview.components.fullScreenBtn.addEventListener('click', handlers.preview.fullScreenMode.bind(this));
    this.view.components.preview.components.gifBtn.addEventListener('click', handlers.preview.getGif.bind(this));

    const { colorPicker } = this.view.components.tools.components;
    colorPicker.addEventListener('input', () => {
      this.state.currColor = colorPicker.value;
    });

    this.state.liveRects.getNext = (function getNextWrapepr() {
      let i = 0;
      return function getNext() {
        if (i >= this.length - 1) {
          i = 0;
        } else {
          i += 1;
        }
        return this[i];
      };
    }());

    startAnimationBinded();
    const canvasSize = this.view.components.canvas.getCanvasSize();
    this.state.mainCanvasSize = canvasSize;
    this.tools.init();
    this.view.resize();

    this.view.components.canvas.components.canvasNode.addEventListener('mousedown', () => {
      this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
    });

    // TODO убрат ьмагиеские значения
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        try {
          this.tools.state.currentTool.remove();
        } catch (error) {
          window.console.log(error);
        }
      } else if (e.keyCode === 90 && e.ctrlKey && this.tools.state.currentTool) {
        const newRect = this.state.history.pop();
        if (newRect) {
          this.view.components.canvas.state.colors = newRect;
          this.state.activeRect = newRect;
          this.state.activeFrame.state.colors = newRect;
          this.view.components.canvas.refreshCanvas(newRect);
          this.state.activeFrame.refreshCanvas(newRect);
        }
      }
    });
  }

  setToolsState() {
    return this;
  }
}

export default Controller;
