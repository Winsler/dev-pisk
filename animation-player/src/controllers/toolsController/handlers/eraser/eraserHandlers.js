import Handler from '../../Handler/index';

function getMouseDownHandler(canvas, convetCoordsToCanvasRect, globalState) {
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

    const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';

    let [i, j] = convetCoordsToCanvasRect(downCoords,
      globalState.mainCanvasSize, globalState.parts);
    // eslint-disable-next-line no-param-reassign
    globalState.activeRect[i][j] = TRANSPARENT_COLOR;
    globalState.view.refreshCanvas(globalState.activeRect);
    globalState.activeFrame.refreshCanvas();

    function onMoseMove(mouseMoveEvt) {
      const positionCoords = {
        x: Math.min(Math.max(0, mouseMoveEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
        y: Math.min(Math.max(0, mouseMoveEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
      };
      [i, j] = convetCoordsToCanvasRect(positionCoords,
        globalState.mainCanvasSize, globalState.parts);
      // eslint-disable-next-line no-param-reassign
      globalState.activeRect[i][j] = TRANSPARENT_COLOR;
      globalState.view.refreshCanvas(globalState.activeRect);
      globalState.activeFrame.refreshCanvas();
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
