import Model from '../../src/models/index';

describe('Model', () => {
  it('should generate empty rect of given size', () => {
    const sizes = [0, 4, 5];
    sizes.forEach(size => {
      const model = new Model(size);
      const rect = model.getEmptyRect();
      const res = (new Array(size)).fill((new Array(size)).fill('rgba(0, 0, 0, 0)'));
      expect(rect).toEqual(res);
    });
  });

  it('should correct convert coords', () => {
    let coords = {
      x: 10,
      y: 15,
    };

    const canvasSize = {
      width: 450,
      height: 450,
    };

    const size = 16;

    let [x, y] = Model.convetCoordsToCanvasRect(coords, canvasSize, size);
    expect([x, y]).toEqual([0, 0]);

    coords = {
      x: 30,
      y: 60,
    };

    [x, y] = Model.convetCoordsToCanvasRect(coords, canvasSize, size);
    expect([x, y]).toEqual([1, 2]);

    coords = {
      x: canvasSize.width,
      y: canvasSize.height,
    };

    [x, y] = Model.convetCoordsToCanvasRect(coords, canvasSize, size);
    expect([x, y]).toEqual([size, size]);

    const canvas = {
      offsetLeft: 300,
      offsetTop: 150,
    };

    coords = {
      x: canvasSize.width + canvas.offsetLeft,
      y: canvasSize.height + canvas.offsetTop,
    };

    [x, y] = Model.convetCoordsToCanvasRect(coords, canvasSize, size, canvas);
    expect([x, y]).toEqual([size, size]);
  });
});
