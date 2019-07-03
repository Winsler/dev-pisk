function renderViewWithRandomRect() {
  const rect = this.model.getEmptyRect();
  this.view.render(rect, this.options);
  this.state.activeRect = rect;
  const frame = this.view.components.frames.node.querySelector('canvas');
  this.state.activeFrame = frame.linkToFrameClass;
  this.state.activeFrame.enable();
  this.view.components.canvas.state.imageMatrix = rect;
}

export function setLiveRects() {
  this.state.liveRects = this.view.components.frames.getItemsLiveList();
  this.state.liveRects.getNext = (function getNextWrapepr() {
    let i = 0;
    return function getNext() {
      if (i >= this.length - 1) {
        i = 0;
      } else {
        i += 1;
      }
      return this[i];
    };
  }());
}

export function saveHistory(e) {
  if (e.type === 'mousedown' && !this.state.history.isEmpty()) {
    return;
  }
  if (this.tools.state.currentTool) {
    this.state.history.append(JSON.parse(JSON.stringify(this.state.activeRect)));
  }
}

export default renderViewWithRandomRect;
