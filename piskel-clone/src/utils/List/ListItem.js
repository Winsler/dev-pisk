class ListItem {
  constructor(rect, previous, next) {
    this.value = JSON.parse(JSON.stringify(rect));
    this.previous = previous || null;
    this.next = next || null;
  }

  clearLinks() {
    this.previous = null;
    this.next = null;
  }
}

export default ListItem;
