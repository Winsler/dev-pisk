import startAnimation from './utils/animation/animation';
import renderViewWithRandomRect from './utils/misc/index';
import handlers from './utils/handlers/index';
import ToolsController from './toolsController/index';
import List from '../utils/List/index';
import ShortcutHolder from './ShortcutHolder';
import MyLocalStorage from './utils/MyLocalStorage';

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
      liveRects: null,
      history: new List(),
      shortcuts: new ShortcutHolder(),
      changeShortcutMode: false,
      editShortcutMode: false,
    };
    this.tools = new ToolsController(this);
    this.slidesStorage = new MyLocalStorage('wiskelSlides');
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
    this.view.components.preview.components.saveBtn.addEventListener('click', handlers.preview.saveSlides.bind(this));
    this.view.components.preview.components.loadBtn.addEventListener('click', handlers.preview.loadSlides.bind(this));
    this.view.components.preview.components.localSaveBtn.addEventListener('click', handlers.preview.localSave.bind(this));
    this.view.components.preview.components.localLoadBtn.addEventListener('click', handlers.preview.localLoad.bind(this));
    this.view.components.preview.components.fileInput.addEventListener('change', handlers.preview.loadFile.bind(this));
    this.view.components.preview.components.infoSize.textContent = `${this.state.parts} x ${this.state.parts}`;
    this.view.components.canvas.components.canvasNode.addEventListener('mousemove', (mouseMoveEvt) => {
      const canvas = this.view.components.canvas.components.canvasNode.linkToClass;
      const [i, j] = this.model.constructor.convetCoordsToCanvasRect(
        { x: mouseMoveEvt.clientX, y: mouseMoveEvt.clientY },
        canvas.getCanvasSize(),
        this.state.parts,
        this.view.components.canvas.components.canvasNode,
      );
      this.view.components.preview.components.infoCoords.textContent = `${j + 1} - ${i + 1}`;
    });

    this.view.components.canvas.components.canvasNode.addEventListener('click', clickEvt => clickEvt.preventDefault());
    this.view.components.canvas.components.canvasNode.addEventListener('mousedown', downEvt => downEvt.preventDefault());
    this.view.components.canvas.components.canvasNode.addEventListener('contextmenu', ctxMenuEvt => ctxMenuEvt.preventDefault());

    const {
      mainColorPicker,
      subColorPicker,
      swapColorTool,
    } = this.view.components.tools.components;

    mainColorPicker.addEventListener('input', () => {
      this.state.currColor = mainColorPicker.value;
    });

    subColorPicker.addEventListener('input', () => {
      this.state.subCurrColor = subColorPicker.value;
    });

    swapColorTool.addEventListener('click', () => {
      this.swapColors();
    });

    const canvasSize = this.view.components.canvas.getCanvasSize();
    this.state.mainCanvasSize = canvasSize;
    this.tools.init();
    this.view.resize();

    this.view.components.canvas.components.canvasNode.addEventListener('mousedown', () => {
      if (this.state.history.isEmpty() && this.tools.state.currentTool) {
        this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
      }
    });

    this.view.components.canvas.components.canvasNode.addEventListener('click', () => {
      if (this.tools.state.currentTool) {
        this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
      }
    });

    this.view.components.canvas.components.canvasNode.addEventListener('contextmenu', () => {
      if (this.tools.state.currentTool) {
        this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
      }
    });

    const KEYS = {
      27: 'ESC',
      90: 'Z',
      89: 'Y',
      32: 'SPACE',
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

    document.body.addEventListener('keydown', (e) => {
      if (this.state.changeShortcutMode) {
        return;
      }
      if (KEYS[e.keyCode] === 'ESC' && this.tools.state.currentTool) {
        this.tools.state.currentTool.remove();
      } else if (KEYS[e.keyCode] === 'Z' && e.ctrlKey) {
        const newRect = this.state.history.previous();
        paintFromHist(newRect);
      } else if (KEYS[e.keyCode] === 'Y' && e.ctrlKey) {
        const newRect = this.state.history.next();
        paintFromHist(newRect);
      } else if (KEYS[e.keyCode] === 'SPACE' && e.ctrlKey) {
        e.preventDefault();
        this.swapColors();
      } else if (this.state.shortcuts.shorcuts[e.keyCode] && !e.ctrlKey) {
        this.state.shortcuts.shorcuts[e.keyCode]();
      }
    });

    this.state.liveRects = this.view.components.frames.getItemsLiveList();
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
  }

  setToolsState() {
    return this;
  }

  getSlides() {
    const slides = Array.from(this.state.liveRects).map((el) => {
      const slide = el.querySelector('canvas').linkToFrameClass.state.imageMatrix;
      return slide;
    });
    return slides;
  }

  saveSlides() {
    const slides = JSON.stringify(this.getSlides());
    this.slidesStorage.save(slides);
  }

  loadSlides() {
    const slides = JSON.parse(this.slidesStorage.load());
    this.renderSlides(slides);
  }

  renderSlides(slides) {
    if (!slides || !slides.length) {
      return;
    }
    this.clearSlides();
    slides.forEach((slide) => {
      this.view.components.frames.addFrame(slide, this.state.liveRects.length + 1);
    });
    this.state.history.clearList();
    const lastSlide = slides[slides.length - 1];
    const lastFrame = this.view.components.frames.components.frameList
      .lastElementChild.querySelector('canvas').linkToClass;
    this.state.activeRect = lastSlide;
    this.view.components.canvas.paintImage(this.state.activeRect);
    this.view.components.canvas.state.imageMatrix = this.state.activeRect;
    this.state.activeFrame = lastFrame;
    this.state.activeFrame.enable();
  }

  clearSlides() {
    const slides = Array.from(this.state.liveRects);
    slides.forEach(el => el.remove());
  }

  swapColors() {
    const temp = this.state.currColor;
    this.state.currColor = this.state.subCurrColor;
    this.state.subCurrColor = temp;
    this.view.components.tools.components.mainColorPicker.value = this.state.currColor;
    this.view.components.tools.components.subColorPicker.value = this.state.subCurrColor;
  }
}

export default Controller;
