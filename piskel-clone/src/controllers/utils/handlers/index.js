import frameHandlers from './framesHadlers/index';
import previewHandlers from './previewHandlers/index';
import getCanvasHandlers from './canvasHandlers/index';
import getGlobalHandlers from './global/index';
import getShortcutMenuHandlers from './shortcutMenuHandlers/index';


const getHandlers = {
  frame: frameHandlers,
  preview: previewHandlers,
  canvas: getCanvasHandlers,
  global: getGlobalHandlers,
  shortcutMenu: getShortcutMenuHandlers,
};

export default getHandlers;
