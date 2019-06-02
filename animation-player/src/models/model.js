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
}

export default Model;
