import {openPhotoPopup} from './utils.js'

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  _photoListener() {
    this._element.querySelector('.card__image').addEventListener('click', (event) => {
      openPhotoPopup(this._title, this._link);
    });
  }

  _likeListener() {
    this._element.querySelector('#like').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like-button_active');
    });
  }

  _trashListener() {
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._element.remove();
    });
  }

  _setEventListeners() {
    this._photoListener();
    this._likeListener();
    this._trashListener();
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


