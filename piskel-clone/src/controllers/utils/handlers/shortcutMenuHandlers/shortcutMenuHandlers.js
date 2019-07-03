const ESC_KEYCODE = 27;

export default function getOnOpenShortcutMenuHandler(controller) {
  const mainController = controller;
  const toolsController = mainController.tools;
  let tool;


  function changeShortcut(keyDownEvt) {
    if (keyDownEvt.keyCode === ESC_KEYCODE) {
      mainController.view.components.tools.components.shortcutMenu
        .disableShortKeyElement();
      mainController.view.node.removeEventListener('keydown', changeShortcut);
      mainController.tools.state.keyDownHandler = null;
      mainController.state.editShortcutMode = false;
      return;
    }
    const shortcuts = mainController.state.shortcuts.changeShortcut(tool,
      keyDownEvt.keyCode, () => {
        mainController.tools.swapTool(toolsController[tool]);
      });
    mainController.view.components.tools.components.shortcutMenu
      .setNewShortcutValues(shortcuts);
    mainController.view.components.tools.components.shortcutMenu
      .disableShortKeyElement();
    mainController.view.node.removeEventListener('keydown', changeShortcut);
    mainController.tools.state.keyDownHandler = null;
    mainController.state.editShortcutMode = false;
  }

  function onClick(clickEvt) {
    if (clickEvt.target.classList.contains('shortcuts__menu-shortcut')) {
      mainController.state.editShortcutMode = true;
      if (mainController.tools.state.keyDownHandler) {
        mainController.view.node.removeEventListener('keydown', mainController.state.state.keyDownHandler);
        mainController.tools.self.state.keyDownHandler = null;
      }
      mainController.view.components.tools.components.shortcutMenu
        .disableShortKeyElement();
      tool = clickEvt.target.parentNode.lastElementChild.textContent.toLowerCase();
      mainController.view.components.tools.components.shortcutMenu
        .activateShortKeyElement(tool);
      mainController.view.node.addEventListener('keydown', changeShortcut);
      mainController.tools.state.keyDownHandler = changeShortcut;
    }
  }

  return onClick;
}


function closeShortcutMenu(globalState, menu) {
  // eslint-disable-next-line no-param-reassign
  globalState.changeShortcutMode = false;
  menu.hide();
}


function showShortcutMenu(globalState, menu) {
  // eslint-disable-next-line no-param-reassign
  globalState.changeShortcutMode = true;
  menu.show();
}

export function getCloseShortcutMenuHandler(globalState, menu) {
  return () => {
    closeShortcutMenu(globalState, menu);
  };
}

export function getShortcutMenuClickHandler(mainController) {
  const menuClass = mainController.view.components.tools.components.shortcutMenu;
  function onEsc(kedownEvt) {
    if (kedownEvt.keyCode === ESC_KEYCODE && !mainController.state.editShortcutMode) {
      closeShortcutMenu(mainController.state, menuClass);
      mainController.view.node.removeEventListener('keydown', onEsc);
    }
  }

  function onShortcutMenuClick() {
    showShortcutMenu(mainController.state, menuClass);
    mainController.view.node.addEventListener('keydown', onEsc);
  }

  return onShortcutMenuClick;
}


export function getRestoreBtnHandler(mainController) {
  function onClick() {
    mainController.state.shortcuts.clear();
    mainController.tools.bindShortCuts();
    mainController.view.components.tools.components.shortcutMenu
      .setDefaultShortcutValues(Object.values(mainController.tools.tools));
  }

  return onClick;
}
