import {photoPopup} from './utils.js'

export class Card {
  constructor(name, link, cardSelector) {
    this._title = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#photo-grid')
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', (event) => {
      photoPopup(event);
    });
    this._element.querySelector('#like').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like-button_active');
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
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


