import Tool from './Tool/index';
import getHandlers from './handlers/index';

class Tools {
  constructor(mainController) {
    this.mainController = mainController;
    this.tools = {};
    this.state = {
      currentTool: null,
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
    this.tools.pen = new Tool(pen, [getHandlers.pen(handlerOptions)]);

    const { eraser } = this.mainController.view.components.tools.components;
    this.tools.eraser = new Tool(eraser, [getHandlers.pen(handlerOptions, true)]);

    const { bucket } = this.mainController.view.components.tools.components;
    this.tools.bucket = new Tool(bucket, [getHandlers.bucket(handlerOptions)]);

    const { rectangle } = this.mainController.view.components.tools.components;
    this.tools.rectangle = new Tool(rectangle,
      [getHandlers.rectangle(handlerOptions, this.linkImage.bind(this))]);

    const { mirrorPen } = this.mainController.view.components.tools.components;
    this.tools.mirrorPen = new Tool(mirrorPen, [getHandlers.mirrorPen(handlerOptions)]);

    const { pipette } = this.mainController.view.components.tools.components;
    this.tools.pipette = new Tool(pipette, [getHandlers.pipette(handlerOptions)]);

    const { lighten } = this.mainController.view.components.tools.components;
    this.tools.lighten = new Tool(lighten, [getHandlers.lighten(handlerOptions)]);

    const { sameColorPainter } = this.mainController.view.components.tools.components;
    this.tools.paintSameColor = new Tool(sameColorPainter,
      [getHandlers.paintSameColor(handlerOptions)]);

    const { palette } = this.mainController.view.components.tools.components;
    getHandlers.toolSelection(palette, this.swapTool.bind(this), this.tools).add();
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
}

export default Tools;
