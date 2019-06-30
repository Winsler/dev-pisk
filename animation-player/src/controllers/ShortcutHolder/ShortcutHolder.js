export default class ShortcutHolder {
  constructor() {
    // keyCode: f
    this.shorcuts = {};
    // toolName: keyCode
    this.toolToKeyCode = {};
  }

  setShortcut(keyCode, toolName, f) {
    this.toolToKeyCode[toolName.toLowerCase()] = keyCode;
    this.shorcuts[keyCode] = f;
  }

  changeShortcut(toolName, newKeyCode, action) {
    const toolNameLowerCase = toolName.toLowerCase();
    const shortcutsToChange = {};
    if (this.shorcuts[newKeyCode]) {
      const entries = Object.entries(this.toolToKeyCode);
      let i = 0;
      while (entries[i][1] !== newKeyCode) {
        i += 1;
      }
      const tool = entries[i][0];
      shortcutsToChange[tool] = null;
      delete this.shorcuts[this.toolToKeyCode[tool]];
      delete this.toolToKeyCode[tool];
    }
    const f = this.shorcuts[this.toolToKeyCode[toolNameLowerCase]] || action;
    delete this.shorcuts[this.toolToKeyCode[toolNameLowerCase]];
    this.shorcuts[newKeyCode] = f;
    delete this.toolToKeyCode[toolNameLowerCase];
    this.toolToKeyCode[toolNameLowerCase] = newKeyCode;
    shortcutsToChange[toolName] = String.fromCharCode(newKeyCode);
    return shortcutsToChange;
  }

  getTool(keyCode) {
    return this.shorcuts[keyCode];
  }

  clear() {
    this.shorcuts = {};
    this.toolToKeyCode = {};
  }
}
