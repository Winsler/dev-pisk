class Model {
  constructor(parts) {
    this.options = {
      parts,
    };
  }

  getEmptyRect() {
    const length = this.options.parts;
    const rect = (new Array(length)).fill((new Array(length)).fill(0));
    return rect.map(row => row.map(() => 'rgba(0, 0, 0, 0)'));
  }

  static convetCoordsToCanvasRect({ x, y }, canvasSize, parts, canvas) {
    const leftOffset = canvas ? canvas.offsetLeft : 0;
    const topOffset = canvas ? canvas.offsetTop : 0;
    const partSizeX = canvasSize.width / parts;
    const partX = Math.trunc((x - leftOffset) / partSizeX);

    const partSizeY = canvasSize.height / parts;
    const partY = Math.trunc((y - topOffset) / partSizeY);

    return [partX, partY];
  }
}

export default Model;
