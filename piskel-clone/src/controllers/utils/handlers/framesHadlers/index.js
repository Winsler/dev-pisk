import {
  onClickFrameBtn, onFrameClick, onDragStart, onDrop, onDragEnter, onDragLeave,
} from './handlers';

const frameHandlers = {
  addFrame: onClickFrameBtn,
  frameActions: onFrameClick,
  dragFrame: onDragStart,
  dropFrame: onDrop,
  dragEnterFrame: onDragEnter,
  dragLeaveFrame: onDragLeave,
};

export default frameHandlers;
