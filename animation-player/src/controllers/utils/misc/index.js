function renderViewWithRandomRect() {
  const rect = this.model.getBlackRect();
  this.view.render(rect, this.options);
  this.state.activeRect = rect;
  const frame = this.view.components.frames.node.querySelector('canvas');
  this.state.activeFrame = frame.linkToFrameClass;
  this.state.activeFrame.enable();
  this.setToolsState();
  this.view.components.canvas.state.imageMatrix = rect;
}

export default renderViewWithRandomRect;
