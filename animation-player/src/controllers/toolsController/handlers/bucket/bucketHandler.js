import Handler from '../../Handler/index';

function getBucketHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onClick(clickEvt) {
    const canvasCoords = {
      x: canvas.getBoundingClientRect().left,
      y: canvas.getBoundingClientRect().top,
      xEnd: canvas.getBoundingClientRect().right,
      yEnd: canvas.getBoundingClientRect().bottom,
    };

    const downCoords = {
      x: Math.min(Math.max(0, clickEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
      y: Math.min(Math.max(0, clickEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
    };

    const [i, j] = convetCoordsToCanvasRect(downCoords,
      globalState.mainCanvasSize, globalState.parts);

    const rect = globalState.activeRect;
    const BUCKET_COLOR = rect[i][j];

    function getNeighbourhood(point, currRect) {
      const Neighbourhood = [];
      for (let m = -1; m < 2; m += 1) {
        for (let n = -1; n < 2; n += 1) {
          if ((Math.abs(m) !== Math.abs(n)) && currRect[point[0] + m]
            && currRect[point[0] + m][point[1] + n] === BUCKET_COLOR) {
            Neighbourhood.push([point[0] + m, point[1] + n]);
          }
        }
      }

      return Neighbourhood;
    }

    function paintArea(area = []) {
      if (!area.length) {
        return null;
      }
      let nextArea = [];
      area.forEach((partCoords) => {
        if (partCoords[0] >= 0 && partCoords[1] >= 0) {
          const part = rect[partCoords[0]][partCoords[1]];
          if (part === BUCKET_COLOR) {
            rect[partCoords[0]][partCoords[1]] = globalState.currColor;
            nextArea = nextArea.concat(getNeighbourhood(partCoords, rect));
          }
        }
      });
      return paintArea(nextArea);
    }
    paintArea([[i, j]]);
    globalState.view.refreshCanvas(globalState.activeRect);
    globalState.activeFrame.refreshCanvas();
  }

  const bucketHandler = new Handler(canvas, 'click', onClick);
  return bucketHandler;
}

export default getBucketHandler;