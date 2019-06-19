import ListItem from './ListItem';

class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(rect) {
    const item = new ListItem(rect);
    if (!this.head) {
      this.head = item;
      this.tail = item;
      return item.value;
    }
    item.previous = this.tail;
    this.tail.next = item;
    this.tail = item;
    return item.value;
  }

  pop() {
    if (!this.head) {
      return null;
    }
    const item = this.tail;
    if (this.tail === this.head) {
      this.clearList();
      return item.value;
    }
    this.tail = this.tail.previous;
    this.tail.next = null;
    item.clearLinks();
    return item.value;
  }

  clearList() {
    this.head = null;
    this.tail = null;
  }
}

export default List;
