export default function getOnMouseMoveHadler(mainController) {
  function onMouseMove(mouseMoveEvt) {
    const canvas = mainController.view.components.canvas.components.canvasNode.linkToClass;
    const [i, j] = mainController.model.constructor.convetCoordsToCanvasRect(
      { x: mouseMoveEvt.clientX, y: mouseMoveEvt.clientY },
      canvas.getCanvasSize(),
      mainController.state.parts,
      mainController.view.components.canvas.components.canvasNode,
    );
    // eslint-disable-next-line no-param-reassign
    mainController.view.components.preview.components.infoCoords.textContent = `${j + 1} - ${i + 1}`;
  }

  return onMouseMove;
}
