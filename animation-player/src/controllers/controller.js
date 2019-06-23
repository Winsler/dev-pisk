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
      subCurrColor: '#000',
      liveRects: this.view.components.frames.getItemsLiveList(),
      history: new List(),
      shortcuts: {},
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

    const { mainColorPicker, subColorPicker } = this.view.components.tools.components;
    mainColorPicker.addEventListener('input', () => {
      this.state.currColor = mainColorPicker.value;
    });

    subColorPicker.addEventListener('input', () => {
      this.state.subCurrColor = subColorPicker.value;
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
      if (!this.state.history.isEmpty()) {
        this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
      }
    });

    this.view.components.canvas.components.canvasNode.addEventListener('mouseup', () => {
      this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
    });

    const KEYS = {
      27: 'ESC',
      90: 'Z',
      89: 'Y',
    };

    const paintFromHist = (hist) => {
      if (hist) {
        const rect = JSON.parse(JSON.stringify(hist));
        this.view.components.canvas.state.imageMatrix = rect;
        this.state.activeRect = rect;
        this.state.activeFrame.state.imageMatrix = rect;
        this.view.components.canvas.paintState(rect);
        this.state.activeFrame.paintState(rect);
      }
    };

    // TODO убрат ьмагиеские значения
    document.body.addEventListener('keydown', (e) => {
      if (KEYS[e.keyCode] === 'ESC' && this.tools.state.currentTool) {
        this.tools.state.currentTool.remove();
      } else if (KEYS[e.keyCode] === 'Z' && e.ctrlKey) {
        const newRect = this.state.history.previous();
        paintFromHist(newRect);
      } else if (KEYS[e.keyCode] === 'Y' && e.ctrlKey) {
        const newRect = this.state.history.next();
        paintFromHist(newRect);
      }
    });
  }

  setToolsState() {
    return this;
  }
}

export default Controller;
