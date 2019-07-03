export default class MyLocalStorage {
  constructor(key) {
    this.key = key;
    this.storage = localStorage;
  }

  save(data) {
    this.storage.setItem(this.key, data);
  }

  load() {
    return this.storage.getItem(this.key);
  }
}
