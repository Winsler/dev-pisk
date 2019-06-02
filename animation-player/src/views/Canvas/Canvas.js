import NodeComponentView from '../NodeComponentView/index';

class Canvas extends NodeComponentView {
  constructor(html, options = { parts: 3, width: 0, height: 0 }) {
    super(html);
    this.components = {
      canvasNode: this.node.querySelector('canvas'),
    };
    this.options = options;
  }

  static getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  getRandomRect() {
    const length = this.options.parts;
    const rect = (new Array(length)).fill((new Array(length)).fill(0));
    return rect.map(row => row.map(() => Canvas.getRandomHexColor()));
  }

  render(parent) {
    super.render(parent);
    if (!this.options.width) {
      this.resizeCanvas();
    }
    const rect = this.getRandomRect();
    this.strokeRect(rect);
    return rect;
  }

  strokeRandomRect() {
    const rect = this.getRandomRect();
    this.strokeRect(rect);
  }

  resizeCanvas() {
    const canvasSize = this.getCanvasSize();
    const canvas = this.components.canvasNode;
    this.options.width = canvasSize.width;
    this.options.height = canvasSize.height;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
  }

  strokeRect(colors) {
    const ctx = this.components.canvasNode.getContext('2d');
    const { parts } = this.options;
    for (let i = 0; i < parts; i += 1) {
      for (let j = 0; j < parts; j += 1) {
        ctx.fillStyle = colors[i % parts][[j % parts]];
        ctx.fillRect(this.options.width / parts * i, this.options.height / parts * j,
          this.options.width / parts, this.options.height / parts);
      }
    }
  }

  getCanvasSize() {
    const canvasStyle = window.getComputedStyle(this.components.canvasNode);
    return {
      width: parseFloat(canvasStyle.width),
      height: parseFloat(canvasStyle.height),
    };
  }
}

export default Canvas;
