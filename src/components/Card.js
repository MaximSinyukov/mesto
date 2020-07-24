import {formValidationOptions} from '../utils/constants.js';

export class Card {
  constructor(data, cardSelector, myId, confirmPopup, deleteCard, createLike, deleteLike, handleCardClick) {
    this.likes = data.likes;
    this._title = data.name;
    this._link = data.link;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._myId = myId;
    this._confirmPopup = confirmPopup;
    this._deleteCard = deleteCard;
    this._createLike = createLike;
    this._deleteLike = deleteLike;
    this._submitConfirm = confirmPopup._popup.querySelector(formValidationOptions.formSelector);
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

  _checkLike(myId) {
    return this.likes.some(function (obj) {
      return (obj._id === myId);
    });
  }

  _likeEvent(event) {
      if(this._checkLike(this._myId)) {
        this._deleteLike(this.cardId);
        event.target.classList.remove('card__like-button_active');
      } else {
        this._createLike(this.cardId);
        event.target.classList.add('card__like-button_active');
      }
  }

  _trashElement() {
      this._confirmPopup.openPopup();
      this._submitConfirm.addEventListener('submit', this._deleteCard);
  }

  _setEventListeners() {
    this.element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this.element.querySelector('#like').addEventListener('click', (evt) => {
      this._likeEvent(evt);
    });
    if (this._ownerId === this._myId) {
      this.element.querySelector('.card__trash-button').addEventListener('click', () => this._trashElement(this.cardId));
    }
  }

  likeStart(event) {
    if(this._checkLike(this._myId)) {
      event.target.classList.add('card__like-button_active');
    } else {
      event.target.classList.remove('card__like-button_active');
    }
}

  deleteListener() {
    this._submitConfirm.removeEventListener('submit', this._deleteCard);
  }

  deleteElement() {
    this.element.remove();
  }

  generateCard() {
    this.element = this._getTemplate();
    const cardImage = this.element.querySelector('.card__image');
    const cardText = this.element.querySelector('.card__text');
    const cardLikeImg = this.element.querySelector('.card__like-button');
    const cardLikes = this.element.querySelector('.card__like-counter');
    this.likeStart({target: cardLikeImg});
    cardLikes.textContent = this.likes.length;
    if (this._ownerId !== this._myId) {
      this.element.querySelector('.card__trash-button').remove();
    }
    this._setEventListeners();
    cardImage.src = this._link;
    cardImage.alt = this._title;
    cardText.textContent = this._title;
    return this.element;
  }
}


