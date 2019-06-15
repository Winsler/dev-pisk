import pen from './Pen/index';
import Tool from './Tool/index';

class Tools {
  constructor(parts, view, globalState) {
    this.tools = {};
    this.parts = parts;
    this.view = view;
    this.globalState = globalState;
    this.state = {
      currentTool: null,
    };
  }

  init() {
    // чтобы не было селектора
    const palette = document.body.querySelector('.palette');
    const canvas = document.body.querySelector('.canvas canvas');
    const penNode = palette.querySelector('[data-tool-type=pen]');
    this.tools.pen = new Tool(penNode,
      [pen.getHandlers(canvas, pen.Tool.convetCoordsToCanvasRect.bind(this), this.globalState)]);

    const eraserNode = palette.querySelector('[data-tool-type=eraser]');
    this.tools.eraser = new Tool(eraserNode);

    palette.addEventListener('click', (toolsClickEvt) => {
      let currentNode = toolsClickEvt.target;
      let tool = currentNode.getAttribute('data-tool-type');
      while (!tool) {
        currentNode = currentNode.parentNode;
        tool = currentNode.getAttribute('data-tool-type');
      }
      this.swapTool(this.tools[tool]);
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
