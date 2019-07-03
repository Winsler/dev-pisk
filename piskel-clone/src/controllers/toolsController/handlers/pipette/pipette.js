import Handler from '../../Handler';

function getPipetteHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
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

    const color = globalState.activeRect[i][j] === 'rgba(0, 0, 0, 0)' ? null : globalState.activeRect[i][j];
    if (color) {
      if (!clickEvt.button) {
        // eslint-disable-next-line no-param-reassign
        globalState.currColor = color;
        // eslint-disable-next-line no-param-reassign
        globalState.view.components.tools.components.mainColorPicker.value = color;
      } else if (clickEvt.button === 2) {
        // eslint-disable-next-line no-param-reassign
        globalState.subCurrColor = color;
        // eslint-disable-next-line no-param-reassign
        globalState.view.components.tools.components.subColorPicker.value = color;
      }
    }
  }

  const onClickRightButtonHandler = new Handler(canvas, 'contextmenu', onClick);
  const onClickHandler = new Handler(canvas, 'click', onClick, {}, [onClickRightButtonHandler]);
  return onClickHandler;
}

export default getPipetteHandler;
