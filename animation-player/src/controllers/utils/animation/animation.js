function startAnimation(fps) {
  let i = 0;
  const actualFPS = fps || this.options.defaultFPS;

  if (this.state.timer) {
    clearInterval(this.state.timer);
  }
  this.state.timer = setInterval(() => {
    i += 1;
    if (this.state.rects.length - 1 < i) {
      i = 0;
    }
    const previewRect = this.state.rects[i];
    this.view.components.preview.strokeRect(previewRect);
  }, 1000 / actualFPS);
}

export default startAnimation;
