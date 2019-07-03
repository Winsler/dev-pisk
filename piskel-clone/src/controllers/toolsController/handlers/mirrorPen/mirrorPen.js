import Handler from '../../Handler/index';

function getMirrorPenHandler({ canvas, convetCoordsToCanvasRect, globalState }) {
  function onMouseDown(mouseDownEvt) {
    if (mouseDownEvt.button === 1) {
      return;
    }

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

    const color = mouseDownEvt.button ? globalState.subCurrColor : globalState.currColor;

    function getMode(evt) {
      if (evt.ctrlKey) {
        return 'horizontal';
      }
      if (evt.shiftKey) {
        return 'both';
      }
      return 'vertical';
    }

    function stroke(coords, coords2, mode = 'vertical') {
      const [i, j] = convetCoordsToCanvasRect(coords,
        globalState.mainCanvasSize, globalState.parts);

      // вынести в функцию и отрефакторить лоигку
      const [verticalMirrorI, verticalMirrorJ] = [globalState.parts - i, j];
      const [horizontalMirrorI, horizontalMirrorJ] = [i, globalState.parts - j];
      const [mirrorI, mirrorJ] = [globalState.parts - i, globalState.parts - j];

      let [i2, j2] = [i, j];
      let [verticalMirrorI2, verticalMirrorJ2] = [verticalMirrorI, verticalMirrorJ];
      let [horizontalMirrorI2, horizontalMirrorJ2] = [horizontalMirrorI, horizontalMirrorJ];
      let [mirrorI2, mirrorJ2] = [mirrorI, mirrorJ];

      if (coords2) {
        [i2, j2] = convetCoordsToCanvasRect(coords2,
          globalState.mainCanvasSize, globalState.parts);
        [verticalMirrorI2, verticalMirrorJ2] = [globalState.parts - i2, j2];
        [horizontalMirrorI2, horizontalMirrorJ2] = [i2, globalState.parts - j2];
        [mirrorI2, mirrorJ2] = [globalState.parts - i2, globalState.parts - j2];
      }

      globalState.view.paintPath([i, j], [i2, j2], color);
      if (mode === 'vertical') {
        globalState.view.paintPath([verticalMirrorI, verticalMirrorJ],
          [verticalMirrorI2, verticalMirrorJ2], color);
      } else if (mode === 'horizontal') {
        globalState.view.paintPath([horizontalMirrorI, horizontalMirrorJ],
          [horizontalMirrorI2, horizontalMirrorJ2], color);
      } else {
        globalState.view.paintPath([verticalMirrorI, verticalMirrorJ],
          [verticalMirrorI2, verticalMirrorJ2], color);
        globalState.view.paintPath([horizontalMirrorI, horizontalMirrorJ],
          [horizontalMirrorI2, horizontalMirrorJ2], color);
        globalState.view.paintPath([mirrorI, mirrorJ],
          [mirrorI2, mirrorJ2], color);
      }
      globalState.activeFrame.paintState();
    }

    const downMode = getMode(mouseDownEvt);
    stroke(downCoords, downCoords, downMode);

    let previousCoords = JSON.parse(JSON.stringify(downCoords));

    function onMoseMove(mouseMoveEvt) {
      const positionCoords = {
        x: Math.min(Math.max(0, mouseMoveEvt.clientX - canvasCoords.x), canvasCoords.xEnd),
        y: Math.min(Math.max(0, mouseMoveEvt.clientY - canvasCoords.y), canvasCoords.yEnd),
      };

      const moveMode = getMode(mouseDownEvt);
      stroke(previousCoords, positionCoords, moveMode);
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

export default getMirrorPenHandler;
