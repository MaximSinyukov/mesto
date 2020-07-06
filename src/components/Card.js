export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  _likeEvent() {
      event.target.classList.toggle('card__like-button_active');
  }

  _trashElement() {
      this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._element.querySelector('#like').addEventListener('click', () => this._likeEvent());
    this._element.querySelector('.card__trash-button').addEventListener('click', () => this._trashElement());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__text').textContent = this._title;
    return this._element;
  }
}


