import startAnimation from './utils/animation/animation';
import renderViewWithRandomRect, { setLiveRects, saveHistory } from './utils/misc/index';
import getHandlers from './utils/handlers/index';
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
    this.view.components.preview.components.infoSize.textContent = `${this.state.parts} x ${this.state.parts}`;

    const canvasSize = this.view.components.canvas.getCanvasSize();
    this.state.mainCanvasSize = canvasSize;
    this.tools.init();
    this.view.resize();

    this.view.components.frames.components.btn.addEventListener('click', getHandlers.frame.addFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('click', getHandlers.frame.frameActions.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragstart', getHandlers.frame.dragFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragover', e => e.preventDefault());
    this.view.components.frames.components.frameList.addEventListener('dragenter', getHandlers.frame.dragEnterFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('dragleave', getHandlers.frame.dragLeaveFrame.bind(this));
    this.view.components.frames.components.frameList.addEventListener('drop', getHandlers.frame.dropFrame.bind(this));

    this.view.components.preview.components.range.addEventListener('input', getHandlers.preview.changeFPS.bind(this));
    this.view.components.preview.components.fullScreenBtn.addEventListener('click', getHandlers.preview.fullScreenMode.bind(this));
    this.view.components.preview.components.gifBtn.addEventListener('click', getHandlers.preview.getGif.bind(this));
    this.view.components.preview.components.saveBtn.addEventListener('click', getHandlers.preview.saveSlides.bind(this));
    this.view.components.preview.components.loadBtn.addEventListener('click', getHandlers.preview.loadSlides.bind(this));
    this.view.components.preview.components.localSaveBtn.addEventListener('click', getHandlers.preview.localSave.bind(this));
    this.view.components.preview.components.localLoadBtn.addEventListener('click', getHandlers.preview.localLoad.bind(this));
    this.view.components.preview.components.fileInput.addEventListener('change', getHandlers.preview.loadFile.bind(this));

    const saveHist = saveHistory.bind(this);
    this.view.components.canvas.components.canvasNode.addEventListener('mousemove', getHandlers.canvas.showCoords(this));
    this.view.components.canvas.components.canvasNode.addEventListener('click', clickEvt => clickEvt.preventDefault());
    this.view.components.canvas.components.canvasNode.addEventListener('mousedown', downEvt => downEvt.preventDefault());
    this.view.components.canvas.components.canvasNode.addEventListener('contextmenu', ctxMenuEvt => ctxMenuEvt.preventDefault());
    this.view.components.canvas.components.canvasNode.addEventListener('click', saveHist);
    this.view.components.canvas.components.canvasNode.addEventListener('contextmenu', saveHist);
    this.view.components.canvas.components.canvasNode.addEventListener('mousedown', saveHist);

    const { menu } = this.view.components.tools.components.shortcutMenu.components;
    menu.addEventListener('click', getHandlers.shortcutMenu.onOpen(this));

    const { shortCutsSetter } = this.view.components.tools.components;
    shortCutsSetter.addEventListener('click', getHandlers.shortcutMenu.onMenuClick(this));

    const menuClass = this.view.components.tools.components.shortcutMenu;
    const { closeBtn } = this.view.components.tools.components.shortcutMenu.components;
    closeBtn.addEventListener('click', getHandlers.shortcutMenu.closeMenu(this.state, menuClass));

    const { restoreBtn } = this.view.components.tools.components.shortcutMenu.components;
    restoreBtn.addEventListener('click', getHandlers.shortcutMenu.restoreShortCuts(this));

    this.view.node.addEventListener('keydown', getHandlers.global.saveHistoryOnKeyDown(this));

    setLiveRects.call(this);
    startAnimation(this);
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
    this.state.history.clearList();
    slides.forEach((slide) => {
      this.view.components.frames.addFrame(slide, this.state.liveRects.length + 1);
    });
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
