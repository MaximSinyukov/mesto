export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.keyCode === 27) {
      this.closePopup();
    }
  }

  _handleEmptyClose(evt) {
    if (!(evt.target.closest('.popup__container') || evt.target.closest('.popup__photo-container'))) {
      this.closePopup();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    addEventListener('keydown',(evt) => this._handleEscClose(evt));
    this._popup.addEventListener('click', (evt) => this._handleEmptyClose(evt));
    closeButton.addEventListener('click',() => this.closePopup());
  }
}
