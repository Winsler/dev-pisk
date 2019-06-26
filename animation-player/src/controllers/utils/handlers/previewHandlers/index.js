import {
  onRangeInput, onFullScreenBtnClick, onGifBtnClick,
  saveSlides, loadSlides, localSave, localLoad, loadFile,
} from './handlers';

const previewHandlers = {
  changeFPS: onRangeInput,
  fullScreenMode: onFullScreenBtnClick,
  getGif: onGifBtnClick,
  saveSlides,
  loadSlides,
  localSave,
  localLoad,
  loadFile,
};

export default previewHandlers;
