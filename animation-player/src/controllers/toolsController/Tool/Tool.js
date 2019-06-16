class Tool {
  constructor(node, handlers = [], cursors = [], shortKey) {
    this.node = node;
    this.handlers = handlers;
    this.cursors = cursors;
    this.shortKey = shortKey;
    this.subtool = null;
    this.globalState = null;
  }

  addToolhandlers() {
    this.handlers.forEach((handler) => {
      handler.add();
    });

    if (this.subtool) {
      this.addToolhandlers.call(this.subtool);
    }
  }

  removeToolhandlers() {
    this.handlers.forEach((handler) => {
      handler.remove();
    });

    if (this.subtool) {
      this.removeToolhandlers.call(this.subtool);
    }
  }

  addhandler(handler) {
    this.handlers.push(handler);
    return this;
  }

  set subTool(subtool) {
    this.subtool = subtool;
    return this;
  }
}
export default Tool;
