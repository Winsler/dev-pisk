export function onClickFrameBtn() {
  const newRect = this.model.getBlackRect();
  this.view.components.frames.addFrame(newRect, this.state.liveRects.length + 1);
  this.view.components.canvas.paintImage(newRect);

  this.state.activeRect = newRect;
  const frames = this.view.components.frames.node.querySelectorAll('canvas');
  if (this.state.activeFrame) {
    this.state.activeFrame.disable();
  }
  this.state.activeFrame = frames[frames.length - 1].linkToFrameClass;
  this.state.activeFrame.enable();
  this.view.components.canvas.state.imageMatrix = newRect;
  this.state.history.clearList();
}

export function onFrameClick(frameListClickEvt) {
  if (frameListClickEvt.target.nodeName === 'CANVAS') {
    const curRect = frameListClickEvt.target.linkToFrameClass.state.imageMatrix;
    this.state.activeRect = curRect;
    if (this.state.activeFrame) {
      this.state.activeFrame.disable();
    }
    this.state.activeFrame = frameListClickEvt.target.linkToFrameClass;
    this.state.activeFrame.enable();
    this.view.components.canvas.paintImage(curRect);
    this.view.components.canvas.state.imageMatrix = curRect;
    this.state.history.clearList();
  } else if (frameListClickEvt.target.classList.contains('fa-copy')) {
    let currNode = frameListClickEvt.target;
    while (currNode.nodeName !== 'LI') {
      currNode = currNode.parentNode;
    }
    this.state.activeFrame.disable();
    const canvas = currNode.querySelector('canvas');
    const copyRect = JSON.parse(JSON.stringify(canvas.linkToFrameClass.state.imageMatrix));
    this.view.components.frames.addFrame(copyRect, this.state.liveRects.length + 1);
    this.view.components.canvas.paintImage(copyRect);

    this.state.activeRect = copyRect;
    this.view.components.canvas.state.imageMatrix = copyRect;
    const frames = this.view.components.frames.node.querySelectorAll('canvas');
    this.state.activeFrame = frames[frames.length - 1].linkToFrameClass;
    this.state.activeFrame.enable();
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

export function onDragStart(dragStartEvt) {
  const dragEl = dragStartEvt.target;
  this.state.dragEl = dragEl;
  this.state.dragPrevSib = dragEl.nextSibling;
}

function getLI(node) {
  let currNode = node;
  if (currNode.nodeName === 'UL') {
    return null;
  }
  while (currNode.nodeName !== 'LI') {
    currNode = currNode.parentNode;
  }
  return currNode;
}

function swapNodes(node1, node2) {
  const parent = node1.parentNode;
  if (parent !== node2.parentNode) return;
  const node1NextSibling = node1.nextSibling;
  const node2NextSibling = node2.nextSibling;

  if (((node1NextSibling === node2) && !node1NextSibling)
    || ((node2NextSibling === node1) && !node2NextSibling)) {
    if (parent.firstNode === node1) {
      parent.appendChild(node2);
    } else {
      parent.appendChild(node1);
    }
  }

  if (node1NextSibling) {
    parent.insertBefore(node2, node1NextSibling);
  } else {
    parent.appendChild(node2);
  }

  if (node2NextSibling) {
    parent.insertBefore(node1, node2NextSibling);
  } else {
    parent.appendChild(node1);
  }
}

export function onDrop(dropEvt) {
  const dropNode = getLI(dropEvt.target);
  if (!dropNode || dropNode === this.state.dragEl) return;
  dropNode.firstElementChild.firstElementChild.classList.remove('frame--drop');
  swapNodes(dropNode, this.state.dragEl);
  this.view.components.frames.recalcIndexes();
}

export function onDragEnter(dragEnterEvt) {
  const enterNode = getLI(dragEnterEvt.target);
  if (!enterNode || enterNode === this.state.dragEl) return;
  enterNode.firstElementChild.firstElementChild.classList.add('frame--drop');
}

export function onDragLeave(dragEnterEvt) {
  const enterNode = getLI(dragEnterEvt.target);
  if (!enterNode || enterNode === this.state.dragEl) return;
  enterNode.firstElementChild.firstElementChild.classList.remove('frame--drop');
}
