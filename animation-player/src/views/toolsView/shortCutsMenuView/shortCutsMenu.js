import NodeComponentView from '../../NodeComponentView';
import html from './shortCutsMenu.html';

export default class ShortCutsMenu extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      menu: this.node.querySelector('.shortcuts__menu'),
      closeBtn: this.node.querySelector('.shortcuts__close-btn'),
    };
    this.state = {
      activeShortcut: null,
    };
  }

  show() {
    this.node.classList.add('shortcuts--visible');
  }

  hide() {
    this.node.classList.remove('shortcuts--visible');
  }

  activateShortKeyElement(toolName) {
    this.state.activeShortcut = this.getTool(toolName);
    this.state.activeShortcut.classList.add('shortcuts__menu-shortcut--active');
  }

  disableShortKeyElement() {
    if (this.state.activeShortcut) {
      this.state.activeShortcut.classList.remove('shortcuts__menu-shortcut--active');
      this.state.activeShortcut = null;
    }
  }

  setNewShortcutValues(shortcuts) {
    Object.keys(shortcuts).forEach((tool) => {
      const element = this.getTool(tool);
      element.textContent = shortcuts[tool] || 'none';
    });
  }

  getTool(toolName) {
    return this.components.menu.querySelector(`[data-type=${toolName.toLowerCase()}]`);
  }

  fillMenu(tools) {
    tools.forEach((tool) => {
      const li = document.createElement('li');
      let div = document.createElement('div');
      div.classList.add('palette__tool', `palette__tool--${tool.name}`, 'shortcuts__menu-img');
      li.appendChild(div);
      div = document.createElement('div');
      div.textContent = String.fromCharCode(tool.shortKeyCode);
      div.classList.add('shortcuts__menu-shortcut');
      div.dataset.type = tool.name.toLowerCase();
      li.appendChild(div);
      div = document.createElement('div');
      const toolName = tool.name.charAt(0).toUpperCase() + tool.name.slice(1);
      div.textContent = toolName;
      div.classList.add('shortcuts__menu-tool-name');
      li.appendChild(div);
      li.classList.add('shortcuts__menu-item');
      this.components.menu.appendChild(li);
    });
  }
}
