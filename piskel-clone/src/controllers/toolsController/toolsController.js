import Tool from './Tool/index';
import getHandlers from './handlers/index';

class Tools {
  constructor(mainController) {
    this.mainController = mainController;
    this.tools = {};
    this.state = {
      currentTool: null,
      keyDownHandler: null,
    };
  }

  init() {
    const canvas = this.mainController.view.components.canvas.components.canvasNode;
    const handlerOptions = {
      canvas,
      convetCoordsToCanvasRect:
        this.mainController.model.constructor.convetCoordsToCanvasRect.bind(this),
      globalState: this.mainController.state,
    };

    const { pen } = this.mainController.view.components.tools.components;
    this.tools.pen = new Tool(pen, [getHandlers.pen(handlerOptions)], [], 'P');

    const { eraser } = this.mainController.view.components.tools.components;
    this.tools.eraser = new Tool(eraser, [getHandlers.pen(handlerOptions, true)], [], 'E');

    const { bucket } = this.mainController.view.components.tools.components;
    this.tools.bucket = new Tool(bucket, [getHandlers.bucket(handlerOptions)], [], 'B');

    const { rectangle } = this.mainController.view.components.tools.components;
    this.tools.rectangle = new Tool(rectangle,
      [getHandlers.rectangle(handlerOptions, this.linkImage.bind(this))], [], 'R');

    const { mirrorPen } = this.mainController.view.components.tools.components;
    this.tools.mirrorpen = new Tool(mirrorPen, [getHandlers.mirrorPen(handlerOptions)], [], 'M');

    const { pipette } = this.mainController.view.components.tools.components;
    this.tools.pipette = new Tool(pipette, [getHandlers.pipette(handlerOptions)], [], 'I');

    const { lighten } = this.mainController.view.components.tools.components;
    this.tools.lighten = new Tool(lighten, [getHandlers.lighten(handlerOptions)], [], 'L');

    const { sameColorPainter } = this.mainController.view.components.tools.components;
    this.tools.paintsamecolor = new Tool(sameColorPainter,
      [getHandlers.paintSameColor(handlerOptions)], [], 'S');

    const { dithering } = this.mainController.view.components.tools.components;
    this.tools.dithering = new Tool(dithering,
      [getHandlers.dithering(handlerOptions)], [], 'D');

    const {
      mainColorPicker,
      subColorPicker,
      swapColorTool,
    } = this.mainController.view.components.tools.components;

    mainColorPicker.addEventListener('input', () => {
      this.mainController.state.currColor = mainColorPicker.value;
    });

    subColorPicker.addEventListener('input', () => {
      this.mainController.state.subCurrColor = subColorPicker.value;
    });

    swapColorTool.addEventListener('click', () => {
      this.mainController.swapColors();
    });

    function onToolSelectin(tool) {
      if (tool === this.state.currentTool) {
        this.state.currentTool.remove();
        this.state.currentTool = null;
      } else {
        this.swapTool(tool);
      }
    }

    const { palette } = this.mainController.view.components.tools.components;
    getHandlers.toolSelection(palette, onToolSelectin.bind(this), this.tools).add();

    this.bindShortCuts();
    this.mainController.view.components.tools.components.shortcutMenu
      .fillMenu(Object.values(this.tools));
  }

  setTool(tool) {
    this.state.currentTool = tool;
    this.state.currentTool.add();
  }

  removeTool() {
    if (!this.state.currentTool) {
      return;
    }
    this.state.currentTool.remove();
    this.state.currentTool = null;
  }

  swapTool(newTool) {
    this.removeTool();
    this.setTool(newTool);
  }

  linkImage(image) {
    this.mainController.state.activeFrame.setImage(image);
    this.mainController.view.components.canvas.state.imageMatrix = image;
    this.mainController.state.activeRect = image;
  }

  setShortKey(tool) {
    if (tool.shortKeyCode) {
      this.mainController.state.shortcuts.setShortcut(tool.shortKeyCode, tool.name,
        () => { this.swapTool(tool); });
    }
  }

  bindShortCuts() {
    Object.values(this.tools).forEach((tool) => {
      this.setShortKey(tool);
    });
  }
}

export default Tools;
