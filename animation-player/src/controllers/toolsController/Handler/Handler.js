class Handler {
  constructor(target, event, handler, options = {}, subHandlers = []) {
    this.target = target;
    this.event = event;
    // this.owner = null;
    // this.handler = e => handler(e, this.owner);
    this.handler = handler;
    this.options = options;
    this.subHandlers = subHandlers;
  }

  add() {
    this.target.addEventListener(this.event, this.handler, this.options);
    this.subHandlers.forEach(handler => handler.add());
  }

  remove() {
    this.target.removeEventListener(this.event, this.handler);
    this.subHandlers.forEach(handler => handler.remove());
  }
}

export default Handler;
