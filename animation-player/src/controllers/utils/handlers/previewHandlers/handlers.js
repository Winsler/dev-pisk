export function onRangeInput(inputEvt) {
  const fps = inputEvt.target.value;
  this.view.components.preview.components.fpsBox.textContent = fps;
}

export function onRangeChange(animate, changeEvt) {
  const fps = changeEvt.target.value;
  this.view.components.preview.components.fpsBox.textContent = fps;
  animate(fps);
}

export function onFullScreenBtnClick() {
  this.view.components.preview.components.canvasNode.requestFullscreen();
}
