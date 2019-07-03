const KEYS = {
  27: 'ESC',
  90: 'Z',
  89: 'Y',
  32: 'SPACE',
};

function paintFromHist(hist, controller) {
  if (hist) {
    const rect = JSON.parse(JSON.stringify(hist));
    // eslint-disable-next-line no-param-reassign
    controller.view.components.canvas.state.imageMatrix = rect;
    // eslint-disable-next-line no-param-reassign
    controller.state.activeRect = rect;
    // eslint-disable-next-line no-param-reassign
    controller.state.activeFrame.state.imageMatrix = rect;
    controller.view.components.canvas.paintState(rect);
    controller.state.activeFrame.paintState(rect);
  }
}

export default function getOnKeyDownHandler(mainController) {
  function onKeyDown(keyDownEvt) {
    if (mainController.state.changeShortcutMode) {
      return;
    }
    if (KEYS[keyDownEvt.keyCode] === 'ESC' && mainController.tools.state.currentTool) {
      mainController.tools.state.currentTool.remove();
    } else if (KEYS[keyDownEvt.keyCode] === 'Z' && keyDownEvt.ctrlKey) {
      const newRect = mainController.state.history.previous();
      paintFromHist(newRect, mainController);
    } else if (KEYS[keyDownEvt.keyCode] === 'Y' && keyDownEvt.ctrlKey) {
      const newRect = mainController.state.history.next();
      paintFromHist(newRect, mainController);
    } else if (KEYS[keyDownEvt.keyCode] === 'SPACE' && keyDownEvt.ctrlKey) {
      keyDownEvt.preventDefault();
      mainController.swapColors();
    } else if (mainController.state.shortcuts.shorcuts[keyDownEvt.keyCode] && !keyDownEvt.ctrlKey) {
      mainController.state.shortcuts.shorcuts[keyDownEvt.keyCode]();
    }
  }
  return onKeyDown;
}
