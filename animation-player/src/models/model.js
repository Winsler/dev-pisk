class Model {
  constructor(parts) {
    this.options = {
      parts,
    };
  }

  static getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  getRandomRect() {
    const length = this.options.parts;
    const rect = (new Array(length)).fill((new Array(length)).fill(0));
    return rect.map(row => row.map(() => Model.getRandomHexColor()));
  }

  getBlackRect() {
    // #6f6f6f #777776
    const length = this.options.parts;
    const rect = (new Array(length)).fill((new Array(length)).fill(0));
    return rect.map(row => row.map(() => 'rgba(0, 0, 0, 0)'));

    /*
    return rect.map((row, rowIndex) => row.map((col, colIndeX) => {
      const color = (rowIndex + colIndeX) % 2 === 0 ? '#6f6f6f' : '#777776';
      return color;
    }));
    */
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
