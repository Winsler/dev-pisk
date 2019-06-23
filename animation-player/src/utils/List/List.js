import ListItem from './ListItem';

class List {
  constructor() {
    this.state = null;
  }

  append(rect) {
    const item = new ListItem(rect);
    if (this.state) {
      if (this.state.next) {
        this.state.next.clearLinks();
      }
      this.state.next = item;
      item.previous = this.state;
    }
    this.state = item;
  }

  previous() {
    if (!this.state) {
      return undefined;
    }
    const item = this.state.previous;
    if (item) {
      this.state = item;
      return item.value;
    }
    return undefined;
  }

  next() {
    if (!this.state) {
      return undefined;
    }
    const item = this.state.next;
    if (item) {
      this.state = item;
      return item.value;
    }
    return undefined;
  }

  clearList() {
    this.state = null;
  }

  isEmpty() {
    return !!this.state;
  }
}

export default List;
