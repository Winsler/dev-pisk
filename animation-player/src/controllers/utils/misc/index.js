function renderViewWithRandomRect() {
  const rect = this.model.getRandomRect();
  this.state.rects.push(rect);
  this.view.render(rect, this.options);
}

export default renderViewWithRandomRect;
