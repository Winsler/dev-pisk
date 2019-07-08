import List from '../src/utils/List/index'

describe('List', () => {
  it('should correct add items', () => {
    const list = new List();
    const res = 1;
    list.append(res);
    expect(list.state.value).toBe(res);
  });

  it('should correct clear self', () => {
    const list = new List();
    const res = 1;
    list.append(res);
    list.clearList();
    expect(list.state).toBe(null);
  });

  it('should correct calc fullness', () => {
    const list = new List();
    expect(list.isEmpty()).toBe(true);
    list.append(1);
    expect(list.isEmpty()).toBe(false);
    list.clearList();
    expect(list.isEmpty()).toBe(true);
  });

  it('should correct return previous item', () => {
    const list = new List();
    expect(list.previous()).toBe(undefined);
    let items = [99, 6, 'abc'];

    items.forEach(item => list.append(item));

    items.pop();
    items = items.reverse();
    items.forEach(item => expect(list.previous()).toBe(item));

    expect(list.previous()).toBe(undefined);
  });

  it('should correct return next item', () => {
    const list = new List();
    expect(list.next()).toBe(undefined);
    let items = [99, 6, 'abc'];

    items.forEach(item => list.append(item));
    items.forEach(() => list.previous());

    items.shift();
    items.forEach((item) => expect(list.next()).toBe(item));

    expect(list.next()).toBe(undefined);
  });
});
