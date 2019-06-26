import Handler from '../../Handler';

function getSameColorPainterHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onClick(clickEvt) {
    if (clickEvt.button === 1) {
      return;
    }

    const canvasClass = canvas.linkToClass;
    const clickCoords = canvasClass.getRelativeCoords({
      x: clickEvt.clientX,
      y: clickEvt.clientY,
    });

    const [i, j] = convetCoordsToCanvasRect(clickCoords,
      canvasClass.getCanvasSize(), globalState.parts);

    const targetColor = globalState.activeRect[i][j];
    const color = clickEvt.button ? globalState.subCurrColor : globalState.currColor;

    for (let m = 0; m < globalState.parts; m += 1) {
      for (let n = 0; n < globalState.parts; n += 1) {
        if (globalState.activeRect[m][n] === targetColor) {
          // eslint-disable-next-line no-param-reassign
          globalState.activeRect[m][n] = color;
        }
      }
    }
    globalState.view.paintImage(globalState.activeRect);
    globalState.activeFrame.paintState();
  }

  const onClickRightButtonHandler = new Handler(canvas, 'contextmenu', onClick);
  const onClickHandler = new Handler(canvas, 'click', onClick, {}, [onClickRightButtonHandler]);
  return onClickHandler;
}

export default getSameColorPainterHandler;
