export function onClickFrameBtn() {
  const newRect = this.model.getRandomRect();
  this.state.rects.push(newRect);
  this.view.components.frames.addFrame(newRect, this.state.rects.length);
  this.view.components.canvas.strokeRect(newRect);

  this.state.activeRect = newRect;
  const frames = this.view.components.frames.node.querySelectorAll('canvas');
  this.state.activeFrame = frames[frames.length - 1].linkToFrameClass;
  this.setToolsState();
}

export function onMouseOverFrame(mouseOverEvt) {
  function onMouseOut(mouseOutEvt) {
    if (mouseOutEvt.relatedTarget.className.slice(0, 11) === 'frame__tool') return;
    mouseOverEvt.target.linkToFrameClass.hidePopup();
    mouseOverEvt.target.removeEventListener('mouseout', onMouseOut);
  }
  if (mouseOverEvt.target.nodeName === 'CANVAS') {
    let currNode = mouseOverEvt.target;
    while (currNode.nodeName !== 'LI') {
      currNode = currNode.parentNode;
    }
    const childs = currNode.parentNode.children;
    let k = 0;
    const len = childs.length;
    let currChild = childs[k];
    while (k < len && currChild !== currNode) {
      k += 1;
      currChild = childs[k];
    }
    currNode.querySelector('.frame__tool--counter').textContent = k + 1;
    mouseOverEvt.target.linkToFrameClass.showPopup();

    mouseOverEvt.target.addEventListener('mouseout', onMouseOut);
  }
}

export function onFrameClick(frameListClickEvt) {
  if (frameListClickEvt.target.nodeName === 'CANVAS') {
    const curRect = frameListClickEvt.target.linkToFrameClass.state.colors;
    this.state.activeRect = curRect;
    this.state.activeFrame = frameListClickEvt.target.linkToFrameClass;
    this.setToolsState();
    this.tools.setActiveRect(this.state.activeRect);
    this.view.components.canvas.strokeRect(curRect);
  } else if (frameListClickEvt.target.classList.contains('fa-copy')) {
    let currNode = frameListClickEvt.target;
    while (currNode.nodeName !== 'LI') {
      currNode = currNode.parentNode;
    }
    const canvas = currNode.querySelector('canvas');
    const copyRect = canvas.linkToFrameClass.state.colors;
    this.state.rects.push(copyRect);
    this.view.components.frames.addFrame(copyRect, this.state.rects.length);
    this.view.components.canvas.strokeRect(copyRect);
  } else if (frameListClickEvt.target.classList.contains('fa-trash-alt')) {
    let currNode = frameListClickEvt.target;
    while (currNode.nodeName !== 'LI') {
      currNode = currNode.parentNode;
    }
    const childs = currNode.parentNode.children;
    let k = 0;
    const len = childs.length;
    if (len === 1) return;
    let currChild = childs[k];
    while (k < len && currChild !== currNode) {
      k += 1;
      currChild = childs[k];
    }
    this.state.rects.splice(k, 1);
    currNode.remove();
    this.view.components.frames.recalcIndexes();
  }
}
