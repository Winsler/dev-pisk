import { onRangeInput, onFullScreenBtnClick } from './handlers';

const previewHandlers = {
  changeFPS: onRangeInput,
  fullScreenMode: onFullScreenBtnClick,
};

export default previewHandlers;
