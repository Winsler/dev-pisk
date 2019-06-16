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

  static convetCoordsToCanvasRect({ x, y }, mainCanvasSize, parts) {
    const partSizeX = mainCanvasSize.width / parts;
    const partX = Math.trunc(x / partSizeX);

    const partSizeY = mainCanvasSize.height / parts;
    const partY = Math.trunc(y / partSizeY);

    return [partX, partY];
  }
}

export default Model;
