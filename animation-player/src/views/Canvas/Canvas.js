import NodeComponentView from '../NodeComponentView/index';

class Canvas extends NodeComponentView {
  constructor(html, options = { parts: 3, width: 0, height: 0 }, colors) {
    super(html);
    this.state = {
      colors,
    };
    this.components = {
      canvasNode: this.node.querySelector('canvas'),
    };
    this.options = options;
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
    this.options.width = canvasSize.width;
    this.options.height = canvasSize.height;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
  }

  strokeRect(rect) {
    const ctx = this.components.canvasNode.getContext('2d');
    const { parts } = this.options;
    for (let i = 0; i < parts; i += 1) {
      for (let j = 0; j < parts; j += 1) {
        ctx.fillStyle = rect[i % parts][[j % parts]];
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

  refreshCanvas() {
    this.strokeRect(this.state.colors);
  }
}

export default Canvas;
