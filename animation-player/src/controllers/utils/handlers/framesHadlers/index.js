import {
  onClickFrameBtn, onMouseOverFrame, onFrameClick, onDragStart, onDrop, onDragEnter, onDragLeave,
} from './handlers';

const frameHandlers = {
  addFrame: onClickFrameBtn,
  showFramePopup: onMouseOverFrame,
  frameActions: onFrameClick,
  drafFrame: onDragStart,
  dropFrame: onDrop,
  dragEnterFrame: onDragEnter,
  dragLeaveFrame: onDragLeave,
};

export default frameHandlers;
