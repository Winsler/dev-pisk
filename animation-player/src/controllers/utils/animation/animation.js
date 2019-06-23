export default function startAnimation() {
  const controller = this;
  let timeOfLastRender = 0;

  const canvas = controller.view.components.preview;

  function renderImage() {
    const { fps } = controller.state;
    const delay = 1000 / fps;
    const now = Date.now();
    if (now - timeOfLastRender >= delay) {
      timeOfLastRender = now;
      const previewRect = controller.state.liveRects.getNext().querySelector('canvas').linkToFrameClass.state.imageMatrix;
      if (previewRect) {
        canvas.clear();
        controller.view.components.preview.paintImage(previewRect);
      }
    }
    requestAnimationFrame(renderImage);
  }
  renderImage();
}
