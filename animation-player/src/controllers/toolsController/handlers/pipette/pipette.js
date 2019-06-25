import Handler from '../../Handler';

function getPipetteHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onClick(clickEvt) {
    const canvasClass = canvas.linkToClass;
    const clickCoords = canvasClass.getRelativeCoords({
      x: clickEvt.clientX,
      y: clickEvt.clientY,
    });

    const [i, j] = convetCoordsToCanvasRect(clickCoords,
      canvasClass.getCanvasSize(), globalState.parts);

    const color = globalState.activeRect[i][j] === 'rgba(0, 0, 0, 0)' ? null : globalState.activeRect[i][j];
    if (color) {
      // eslint-disable-next-line no-param-reassign
      globalState.currColor = color;
      // eslint-disable-next-line no-param-reassign
      globalState.view.components.tools.components.mainColorPicker.value = color;
    }
  }

  const onClickHandler = new Handler(canvas, 'click', onClick);
  return onClickHandler;
}

export default getPipetteHandler;
