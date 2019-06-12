import { onRangeInput, onRangeChange, onFullScreenBtnClick } from './handlers';

const previewHandlers = {
  changeRange: onRangeInput,
  changeFPS: onRangeChange,
  fullScreenMode: onFullScreenBtnClick,
};

export default previewHandlers;
