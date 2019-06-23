import Handler from '../../Handler';

// TODO: рефатокрить все повторы
function getRectangleHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onMouseDown(mouesDownEvt) {
    const canvasClass = canvas.linkToClass;
    const downCoords = canvasClass.getRelativeCoords({
      x: mouesDownEvt.clientX,
      y: mouesDownEvt.clientY,
    });

    let tempRect = null;
    const [i0, j0] = convetCoordsToCanvasRect(downCoords,
      canvasClass.getCanvasSize(), globalState.parts);
    // eslint-disable-next-line no-param-reassign
    globalState.activeRect[i0][j0] = globalState.currColor;
    canvasClass.paintImage(globalState.activeRect);

    function onMouseMove(mouseMoveEvt) {
      const moveCoords = canvasClass.getRelativeCoords({
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY,
      });
      tempRect = JSON.parse(JSON.stringify(globalState.activeRect));
      let [i, j] = convetCoordsToCanvasRect(moveCoords,
        canvasClass.getCanvasSize(), globalState.parts);
      if (i === i0 && j === j0) {
        return;
      }
      const signX = Math.abs(moveCoords.x - downCoords.x) / (moveCoords.x - downCoords.x) || 1;
      const signY = Math.abs(moveCoords.y - downCoords.y) / (moveCoords.y - downCoords.y) || 1;

      const deltaX = Math.abs(i - i0);
      const deltaY = Math.abs(j - j0);
      const totalDelta = Math.min(deltaX, deltaY);

      if (mouseMoveEvt.shiftKey) {
        i = i0 + totalDelta * signX;
        j = j0 + totalDelta * signY;
      }
      if (i === i0 && j === j0) {
        return;
      }

      while (i !== i0) {
        i -= signX;
        tempRect[i][j0] = globalState.currColor;
        tempRect[i][j] = globalState.currColor;
      }

      [i, j] = convetCoordsToCanvasRect(moveCoords,
        canvasClass.getCanvasSize(), globalState.parts);
      if (mouseMoveEvt.shiftKey) {
        i = i0 + totalDelta * signX;
        j = j0 + totalDelta * signY;
      }
      while (j !== j0) {
        j -= signY;
        tempRect[i0][j] = globalState.currColor;
        tempRect[i][j] = globalState.currColor;
      }
      [i, j] = convetCoordsToCanvasRect(moveCoords,
        canvasClass.getCanvasSize(), globalState.parts);
      if (mouseMoveEvt.shiftKey) {
        i = i0 + totalDelta * signX;
        j = j0 + totalDelta * signY;
      }
      tempRect[i][j] = globalState.currColor;
      canvasClass.paintImage(tempRect);
    }

    const mouseMoveHandler = new Handler(canvas, 'mousemove', onMouseMove);

    function onMouseUp() {
      // TODO отрисовать анимацию и фрейм, заменить все это на метод, чтобы не было переназначения
      const newImage = JSON.parse(JSON.stringify(tempRect));
      // setImage(newImage);
      globalState.activeFrame.setImage(newImage);
      // eslint-disable-next-line no-param-reassign
      globalState.view.components.canvas.state.imageMatrix = newImage;
      // eslint-disable-next-line no-param-reassign
      globalState.activeRect = newImage;
      globalState.view.paintImage(globalState.activeRect);
      canvasClass.paintImage(globalState.activeRect);
      globalState.activeFrame.paintState();
      mouseMoveHandler.remove();
    }

    const mouseUpHandler = new Handler(canvas, 'mouseup', onMouseUp, { once: true });

    mouseMoveHandler.add();
    mouseUpHandler.add();
  }

  const triangleHandler = new Handler(canvas, 'mousedown', onMouseDown);

  return triangleHandler;
}

export default getRectangleHandler;
