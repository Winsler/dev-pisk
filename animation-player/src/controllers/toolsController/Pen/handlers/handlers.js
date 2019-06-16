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

    function stroke(coords) {
      const [i, j] = convetCoordsToCanvasRect(coords,
        globalState.mainCanvasSize, globalState.parts);
      // eslint-disable-next-line no-param-reassign
      globalState.activeRect[i][j] = erase ? 'rgba(0, 0, 0, 0)' : globalState.currColor;
      globalState.view.refreshCanvas(globalState.activeRect);
      globalState.activeFrame.refreshCanvas();
    }

    stroke(downCoords);

    function onMoseMove(mouseMoveEvt) {
      const positionCoords = {
        x: Math.min(Math.max(0, mouseMoveEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
        y: Math.min(Math.max(0, mouseMoveEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
      };

      stroke(positionCoords);
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
