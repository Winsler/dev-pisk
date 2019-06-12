import { onClickFrameBtn, onMouseOverFrame, onFrameClick } from './handlers';

const frameHandlers = {
  addFrame: onClickFrameBtn,
  showFramePopup: onMouseOverFrame,
  frameActions: onFrameClick,
};

export default frameHandlers;
