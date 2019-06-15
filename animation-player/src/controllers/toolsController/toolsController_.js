class ToolsController {
  constructor(parts, view, globalState) {
    this.parts = parts;
    this.size = null;
    this.view = view;
    this.globalState = globalState;
  }

  init() {
    const canvas = document.body.querySelector('.canvas canvas');
    const canvasCoords = {
      x: canvas.getBoundingClientRect().left,
      y: canvas.getBoundingClientRect().top,
      xEnd: canvas.getBoundingClientRect().right,
      yEnd: canvas.getBoundingClientRect().bottom,
    };

    canvas.addEventListener('mousemove', (e) => {
      const positionCoords = {
        x: Math.min(Math.max(0, e.clientX - canvasCoords.x), canvasCoords.xEnd),
        y: Math.min(Math.max(0, e.clientY - canvasCoords.y), canvasCoords.yEnd),
      };
      const [i, j] = this.convetCoordsToCanvasRect(positionCoords);
      this.globalState.activeRect[i][j] = 'red';
      this.view.refreshCanvas(this.globalState.activeRect);
      this.globalState.activeFrame.refreshCanvas();
    });
  }

  convetCoordsToCanvasRect({ x, y }) {
    const partSizeX = this.canvasSize.width / this.parts;
    const partX = Math.trunc(x / partSizeX);

    const partSizeY = this.canvasSize.height / this.parts;
    const partY = Math.trunc(y / partSizeY);

    return [partX, partY];
  }

  setCanvasSize(size) {
    this.canvasSize = size;
  }
}

export default ToolsController;
