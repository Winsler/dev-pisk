import NodeComponentView from '../NodeComponentView/index';
import pattern from './img/canvas-pattern.png';

class Canvas extends NodeComponentView {
  constructor(html, options = { parts: 3, width: 0, height: 0 }, colors) {
    super(html);
    this.state = {
      colors,
      layout: {
        defaultLayout: colors ? JSON.parse(JSON.stringify(colors)) : [[]],
        layouts: [colors],
      },
    };
    this.components = {
      canvasNode: this.node.querySelector('canvas'),
    };
    this.options = options;
    this.options.maxWidth = 600;
    this.node.querySelector('canvas').style.backgroundImage = `url(${pattern})`;
    this.components.canvasNode.linkToClass = this;
  }

  render(parent, rect) {
    super.render(parent);
    this.resizeCanvas();
    this.strokeRect(rect);
    return rect;
  }

  resizeCanvas() {
    const canvasSize = this.getCanvasSize();
    const canvas = this.components.canvasNode;
    const width = Math.min(canvasSize.width, this.options.maxWidth);
    this.options.width = Math.floor(width / this.options.parts) * this.options.parts;
    this.options.height = this.options.width;
    this.components.canvasNode.style.height = `${this.options.height}px`;
    this.components.canvasNode.style.width = `${this.options.width}px`;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
  }

  strokeRect(rect) {
    this.clear();
    const ctx = this.components.canvasNode.getContext('2d');
    const { parts } = this.options;
    for (let i = 0; i < parts; i += 1) {
      for (let j = 0; j < parts; j += 1) {
        ctx.fillStyle = rect[i % parts][[j % parts]];
        ctx.fillRect(Math.round(this.options.width / parts * i),
          Math.round(this.options.height / parts * j),
          Math.round(this.options.width / parts), Math.round(this.options.height / parts));
      }
    }
  }

  strokePath(startCoords, endCoords, color) {
    const startPath = startCoords.slice();
    const endPath = endCoords.slice();
    const rect = this.state.colors;

    // eslint-disable-next-line no-param-reassign
    rect[startPath[0]][startPath[1]] = color;

    function isEqual(coords1, coords2) {
      return coords1.every((el, elIndex) => el === coords2[elIndex]);
    }

    let counter = 0;
    while (!isEqual(startPath, endPath)) {
      const direction = counter % 2 === 0 ? 1 : 0;
      if ((startPath[0] > endPath[0]) && direction) {
        startPath[0] -= 1;
      } else if (((startPath[0] < endPath[0]) && direction)) {
        startPath[0] += 1;
      } else if (((startPath[1] > endPath[1]) && !direction)) {
        startPath[1] -= 1;
      } else if (((startPath[1] < endPath[1]) && !direction)) {
        startPath[1] += 1;
      }
      counter += 1;
      // eslint-disable-next-line no-param-reassign
      rect[startPath[0]][startPath[1]] = color;
    }
    this.strokeRect(rect);
  }

  getCanvasSize() {
    const canvasStyle = window.getComputedStyle(this.components.canvasNode);
    return {
      width: parseFloat(canvasStyle.width),
      height: parseFloat(canvasStyle.height),
    };
  }

  refreshCanvas() {
    this.strokeRect(this.state.colors);
  }

  refreshCanvasPath(start, end, color) {
    this.strokePath(start, end, color);
  }

  clear() {
    const ctx = this.components.canvasNode.getContext('2d');
    const size = this.getCanvasSize();
    ctx.clearRect(0, 0, size.width, size.height);
  }

  clearPart({ xPos, yPos }) {
    const ctx = this.components.canvasNode.getContext('2d');
    const size = this.getCanvasSize();

    ctx.clearRect(Math.round(size.height / this.options.parts * xPos),
      Math.round(size.width / this.options.parts * yPos),
      Math.round(size.height / this.options.parts), Math.round(size.width / this.options.parts));
  }
}

export default Canvas;
