export function onRangeInput(inputEvt) {
  const fps = inputEvt.target.value;
  this.view.components.preview.components.fpsBox.textContent = fps;
  this.state.fps = fps;
}

export function onFullScreenBtnClick() {
  this.view.components.preview.components.canvasNode.requestFullscreen();
}
