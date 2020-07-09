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

  _likeEvent(event) {
      event.target.classList.toggle('card__like-button_active');
  }

  _trashElement() {
      this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._element.querySelector('#like').addEventListener('click', (evt) => this._likeEvent(evt));
    this._element.querySelector('.card__trash-button').addEventListener('click', () => this._trashElement());
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardText = this._element.querySelector('.card__text');
    this._setEventListeners();
    cardImage.src = this._link;
    cardImage.alt = this._title;
    cardText.textContent = this._title;
    return this._element;
  }
}


