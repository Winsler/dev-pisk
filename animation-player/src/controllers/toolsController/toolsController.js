import Tool from './Tool/index';
import getHandlers from './handlers/index';

class Tools {
  constructor(mainController) {
    this.mainController = mainController;
    this.tools = {};
    this.state = {
      currentTool: null,
      keyDownHandler: null,
    };
  }

  init() {
    const canvas = this.mainController.view.components.canvas.components.canvasNode;
    const handlerOptions = {
      canvas,
      convetCoordsToCanvasRect:
        this.mainController.model.constructor.convetCoordsToCanvasRect.bind(this),
      globalState: this.mainController.state,
    };

    const { pen } = this.mainController.view.components.tools.components;
    this.tools.pen = new Tool(pen, [getHandlers.pen(handlerOptions)], [], 'P');

    const { eraser } = this.mainController.view.components.tools.components;
    this.tools.eraser = new Tool(eraser, [getHandlers.pen(handlerOptions, true)], [], 'E');

    const { bucket } = this.mainController.view.components.tools.components;
    this.tools.bucket = new Tool(bucket, [getHandlers.bucket(handlerOptions)], [], 'B');

    const { rectangle } = this.mainController.view.components.tools.components;
    this.tools.rectangle = new Tool(rectangle,
      [getHandlers.rectangle(handlerOptions, this.linkImage.bind(this))], [], 'R');

    const { mirrorPen } = this.mainController.view.components.tools.components;
    this.tools.mirrorpen = new Tool(mirrorPen, [getHandlers.mirrorPen(handlerOptions)], [], 'M');

    const { pipette } = this.mainController.view.components.tools.components;
    this.tools.pipette = new Tool(pipette, [getHandlers.pipette(handlerOptions)], [], 'I');

    const { lighten } = this.mainController.view.components.tools.components;
    this.tools.lighten = new Tool(lighten, [getHandlers.lighten(handlerOptions)], [], 'L');

    const { sameColorPainter } = this.mainController.view.components.tools.components;
    this.tools.paintsamecolor = new Tool(sameColorPainter,
      [getHandlers.paintSameColor(handlerOptions)], [], 'S');

    const { palette } = this.mainController.view.components.tools.components;
    getHandlers.toolSelection(palette, this.swapTool.bind(this), this.tools).add();

    const globalState = this.mainController.state;

    const showShortcutMenu = () => {
      globalState.changeShortcutMode = true;
      this.mainController.view.components.tools.components.shortcutMenu.show();
    };

    const { mainController } = this;
    const self = this;

    const closeShortcutMenu = () => {
      globalState.changeShortcutMode = false;
      this.mainController.view.components.tools.components.shortcutMenu.hide();
    };

    const { shortCutsSetter } = this.mainController.view.components.tools.components;
    shortCutsSetter.addEventListener('click', () => {
      showShortcutMenu();
      function onEsc(kedownEvt) {
        if (kedownEvt.keyCode === 27 && !mainController.state.editShortcutMode) {
          closeShortcutMenu();
          document.removeEventListener('keydown', onEsc);
        }
      }
      document.addEventListener('keydown', onEsc);
    });

    this.mainController.view.components.tools.components.shortcutMenu.components.closeBtn
      .addEventListener('click', closeShortcutMenu);


    this.mainController.view.components.tools.components.shortcutMenu.components.menu
      .addEventListener('click', (clickEvt) => {
        if (clickEvt.target.classList.contains('shortcuts__menu-shortcut')) {
          mainController.state.editShortcutMode = true;
          if (self.state.keyDownHandler) {
            document.removeEventListener('keydown', self.state.keyDownHandler);
            self.state.keyDownHandler = null;
          }
          this.mainController.view.components.tools.components.shortcutMenu
            .disableShortKeyElement();
          const tool = clickEvt.target.parentNode.lastElementChild.textContent.toLowerCase();
          this.mainController.view.components.tools.components.shortcutMenu
            .activateShortKeyElement(tool);
          // eslint-disable-next-line no-inner-declarations
          function changeShortcut(keDownEvt) {
            if (keDownEvt.keyCode === 27) {
              globalState.view.components.tools.components.shortcutMenu
                .disableShortKeyElement();
              document.removeEventListener('keydown', changeShortcut);
              self.state.keyDownHandler = null;
              mainController.state.editShortcutMode = false;
              return;
            }
            const shortcuts = globalState.shortcuts.changeShortcut(tool,
              keDownEvt.keyCode, () => {
                const { tools } = mainController.tools;
                self.swapTool(tools[tool]);
              });
            globalState.view.components.tools.components.shortcutMenu
              .setNewShortcutValues(shortcuts);
            globalState.view.components.tools.components.shortcutMenu
              .disableShortKeyElement();
            document.removeEventListener('keydown', changeShortcut);
            self.state.keyDownHandler = null;
            mainController.state.editShortcutMode = false;
          }
          document.addEventListener('keydown', changeShortcut);
          self.state.keyDownHandler = changeShortcut;
        }
      });

    this.buildShortCuts();
    this.mainController.view.components.tools.components.shortcutMenu
      .fillMenu(Object.values(this.tools));
  }

  setTool(tool) {
    this.state.currentTool = tool;
    this.state.currentTool.add();
  }

  removeTool() {
    if (!this.state.currentTool) {
      return;
    }
    this.state.currentTool.remove();
    this.state.currentTool = null;
  }

  swapTool(newTool) {
    this.removeTool();
    this.setTool(newTool);
  }

  linkImage(image) {
    this.mainController.state.activeFrame.setImage(image);
    this.mainController.view.components.canvas.state.imageMatrix = image;
    this.mainController.state.activeRect = image;
  }

  setShortKey(tool) {
    if (tool.shortKeyCode) {
      this.mainController.state.shortcuts.setShortcut(tool.shortKeyCode, tool.name,
        () => { this.swapTool(tool); });
    }
  }

  buildShortCuts() {
    Object.values(this.tools).forEach((tool) => {
      this.setShortKey(tool);
    });
  }
}

export default Tools;
