export class Section {
  constructor({items, renderer}, containerSelector) {
    this.renderedItems = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.renderedItems.forEach(item => this.renderer(item));
  }

  addItems(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
