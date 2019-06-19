import Handler from '../../Handler';

function getSameColorPainterHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onClick(clickEvt) {
    const canvasClass = canvas.linkToClass;
    const clickCoords = canvasClass.getRelativeCoords({
      x: clickEvt.clientX,
      y: clickEvt.clientY,
    });

    const [i, j] = convetCoordsToCanvasRect(clickCoords,
      canvasClass.getCanvasSize(), globalState.parts);

    const targetColor = globalState.activeRect[i][j];

    for (let m = 0; m < globalState.parts; m += 1) {
      for (let n = 0; n < globalState.parts; n += 1) {
        if (globalState.activeRect[m][n] === targetColor) {
          // eslint-disable-next-line no-param-reassign
          globalState.activeRect[m][n] = globalState.currColor;
        }
      }
    }
    globalState.view.refreshCanvas(globalState.activeRect);
    globalState.activeFrame.refreshCanvas();
  }

  const onClickHandler = new Handler(canvas, 'click', onClick);
  return onClickHandler;
}

export default getSameColorPainterHandler;
