

/*
function startAnimation(fps) {
  const actualFPS = fps || this.options.defaultFPS;

  if (this.state.timer) {
    clearInterval(this.state.timer);
  }
  this.state.timer = setInterval(() => {
    const previewRect = this.state.rects.next();
    this.view.components.preview.strokeRect(previewRect);
  }, 1000 / actualFPS);
}
*/

function startAnimation() {
  const controller = this;
  let timeOfLastRender = 0;

  const canvas = document.body.querySelector('.preview canvas').linkToClass;

  function renderRect() {
    const { fps } = controller.state;
    const delay = 1000 / fps;
    const now = Date.now();
    if (now - timeOfLastRender >= delay) {
      timeOfLastRender = now;
      const previewRect = controller.state.liveRects.getNext().querySelector('canvas').linkToFrameClass.state.colors;
      if (previewRect) {
        canvas.clear();
        controller.view.components.preview.strokeRect(previewRect);
      }
    }
    requestAnimationFrame(renderRect);
  }
  renderRect();
}

export default startAnimation;
