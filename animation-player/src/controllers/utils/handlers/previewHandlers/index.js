import { onRangeInput, onFullScreenBtnClick, onGifBtnClick } from './handlers';

const previewHandlers = {
  changeFPS: onRangeInput,
  fullScreenMode: onFullScreenBtnClick,
  getGif: onGifBtnClick,
};

export default previewHandlers;
