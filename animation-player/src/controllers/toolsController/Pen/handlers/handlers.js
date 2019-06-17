import Handler from '../../Handler/index';

function getMouseDownHandler({ canvas, convetCoordsToCanvasRect, globalState }, erase = false) {
  function onMouseDown(mouseDownEvt) {
    const canvasCoords = {
      x: canvas.getBoundingClientRect().left,
      y: canvas.getBoundingClientRect().top,
      xEnd: canvas.getBoundingClientRect().right,
      yEnd: canvas.getBoundingClientRect().bottom,
    };

    const downCoords = {
      x: Math.min(Math.max(0, mouseDownEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
      y: Math.min(Math.max(0, mouseDownEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
    };

    function stroke(coords, coords2) {
      const [i, j] = convetCoordsToCanvasRect(coords,
        globalState.mainCanvasSize, globalState.parts);
      let [i2, j2] = [i, j];
      if (coords2) {
        [i2, j2] = convetCoordsToCanvasRect(coords2,
          globalState.mainCanvasSize, globalState.parts);
      } else {
        [i2, j2] = [i, j];
      }

      const color = erase ? 'rgba(0, 0, 0, 0)' : globalState.currColor;
      // eslint-disable-next-line no-param-reassign
      // globalState.activeRect[i][j] = erase ? 'rgba(0, 0, 0, 0)' : globalState.currColor;
      // globalState.view.refreshCanvas(globalState.activeRect);
      globalState.view.refreshCanvasPath([i, j], [i2, j2], color);
      globalState.activeFrame.refreshCanvas();
      // globalState.activeR.refreshCanvasPath([i, j], [i2, j2], globalState.currColor);
    }

    stroke(downCoords, downCoords);

    let previousCoords = JSON.parse(JSON.stringify(downCoords));

    function onMoseMove(mouseMoveEvt) {
      // eslint-disable-next-line no-debugger
      const positionCoords = {
        x: Math.min(Math.max(0, mouseMoveEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
        y: Math.min(Math.max(0, mouseMoveEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
      };

      // eslint-disable-next-line no-debugger
      if (previousCoords.x !== positionCoords.x || previousCoords.y !== positionCoords.y) debugger;

      stroke(previousCoords, positionCoords);
      previousCoords = JSON.parse(JSON.stringify(positionCoords));
    }

    const onMouseMoveHandler = new Handler(canvas, 'mousemove', onMoseMove);

    function onMouseUp() {
      onMouseMoveHandler.remove();
    }

    const onMouseUpHandler = new Handler(canvas, 'mouseup', onMouseUp, { once: true });

    onMouseMoveHandler.add();
    onMouseUpHandler.add();
  }

  const onMouseDownHandler = new Handler(canvas, 'mousedown', onMouseDown);

  return onMouseDownHandler;
}

export default getMouseDownHandler;
