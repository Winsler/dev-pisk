import Handler from '../../Handler/index';

function getMouseDownHandler({ canvas, convetCoordsToCanvasRect, globalState }, erase = false) {
  function onMouseDown(mouseDownEvt) {
    const canvasClass = canvas.linkToClass;

    const downCoords = canvasClass.getRelativeCoords({
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY,
    });

    function stroke(coords, coords2) {
      const [i, j] = convetCoordsToCanvasRect(coords,
        globalState.mainCanvasSize, globalState.parts);

      let [i2, j2] = [i, j];

      if (coords2) {
        [i2, j2] = convetCoordsToCanvasRect(coords2,
          globalState.mainCanvasSize, globalState.parts);
      }

      const color = erase ? 'rgba(0, 0, 0, 0)' : globalState.currColor;

      globalState.view.paintPath([i, j], [i2, j2], color);
      globalState.activeFrame.paintState();
    }

    stroke(downCoords, downCoords);

    let previousCoords = JSON.parse(JSON.stringify(downCoords));

    function onMoseMove(mouseMoveEvt) {
      const positionCoords = canvasClass.getRelativeCoords({
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY,
      });
      stroke(previousCoords, positionCoords);
      previousCoords = JSON.parse(JSON.stringify(positionCoords));
    }

    const onMouseMoveHandler = new Handler(canvas, 'mousemove', onMoseMove);

    function onMouseUp() {
      onMouseMoveHandler.remove();
    }

    const onMouseUpHandler = new Handler(canvas, 'mouseup', onMouseUp, { once: true });

    function onMouseOut() {
      onMouseMoveHandler.remove();
      onMouseUpHandler.remove();
    }

    const onMouseOutHandler = new Handler(canvas, 'mouseout', onMouseOut, { once: true });

    onMouseMoveHandler.add();
    onMouseUpHandler.add();
    onMouseOutHandler.add();
  }

  const onMouseDownHandler = new Handler(canvas, 'mousedown', onMouseDown);

  return onMouseDownHandler;
}

export default getMouseDownHandler;
