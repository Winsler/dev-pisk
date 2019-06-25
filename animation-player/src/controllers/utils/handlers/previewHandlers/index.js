import {
  onRangeInput, onFullScreenBtnClick, onGifBtnClick, saveSlides, loadSlides,
} from './handlers';

const previewHandlers = {
  changeFPS: onRangeInput,
  fullScreenMode: onFullScreenBtnClick,
  getGif: onGifBtnClick,
  saveSlides,
  loadSlides,
};

export default previewHandlers;
