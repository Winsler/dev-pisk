import pen from './Pen/index';
import Tool from './Tool/index';
import getHandlers from './handlers/index';
// import handlers from '../utils/handlers';

class Tools {
  constructor(mainController) {
    this.mainController = mainController;
    this.tools = {};
    this.parts = this.mainController.state.parts;
    this.view = this.mainController.view;
    this.state = {
      currentTool: null,
    };
  }

  init() {
    // TODO чтобы не было селектора
    const palette = document.body.querySelector('.palette');
    const canvas = document.body.querySelector('.canvas canvas');
    const penNode = palette.querySelector('[data-tool-type=pen]');
    const handlerOptions = {
      canvas,
      convetCoordsToCanvasRect:
        this.mainController.model.constructor.convetCoordsToCanvasRect.bind(this),
      globalState: this.mainController.state,
    };

    // Тут и далее повторяется - вынести в функцию
    this.tools.pen = new Tool(penNode,
      [pen.getHandlers(handlerOptions)]);

    const eraserNode = palette.querySelector('[data-tool-type=eraser]');
    this.tools.eraser = new Tool(eraserNode,
      [pen.getHandlers(handlerOptions, true)]);

    const bucketNode = palette.querySelector('[data-tool-type=bucket]');
    this.tools.bucket = new Tool(bucketNode, [getHandlers.bucket(handlerOptions)]);

    const rectangleNode = palette.querySelector('[data-tool-type=rectangle]');
    this.tools.rectangle = new Tool(rectangleNode, [getHandlers.rectangle(handlerOptions)]);

    const sameColorPainterNode = palette.querySelector('[data-tool-type=paintSameColor]');
    this.tools.paintSameColor = new Tool(sameColorPainterNode,
      [getHandlers.paintSameColor(handlerOptions)]);

    palette.addEventListener('click', (toolsClickEvt) => {
      let currentNode = toolsClickEvt.target;
      let tool = currentNode.getAttribute('data-tool-type');
      while (!tool) {
        currentNode = currentNode.parentNode;
        tool = currentNode.getAttribute('data-tool-type');
      }
      if (tool !== 'colorPicker') {
        this.swapTool(this.tools[tool]);
      }
    });
  }

  setTool(tool) {
    this.state.currentTool = tool;
    this.state.currentTool.node.classList.add('palette__tool--active');
    this.state.currentTool.addToolhandlers();
    this.state.currentTool.cursors.forEach((cursor) => {
      const currentCursor = cursor;
      currentCursor.target.style.cursor = currentCursor.cursor;
    });
  }

  removeTool() {
    if (!this.state.currentTool) {
      return;
    }

    this.state.currentTool.node.classList.remove('palette__tool--active');
    this.state.currentTool.removeToolhandlers();
    this.state.currentTool.cursors.forEach((cursor) => {
      const currentCursor = cursor;
      currentCursor.target.style.cursor = '';
    });
    this.state.currentTool = null;
  }

  swapTool(newTool) {
    this.removeTool();
    this.setTool(newTool);
  }
}

export default Tools;
