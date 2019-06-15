function renderViewWithRandomRect() {
  const rect = this.model.getBlackRect();
  this.state.rects.push(rect);
  this.view.render(rect, this.options);
  this.state.activeRect = rect;
  const frame = this.view.components.frames.node.querySelector('canvas');
  this.state.activeFrame = frame.linkToFrameClass;
  this.setToolsState();
}

export default renderViewWithRandomRect;
