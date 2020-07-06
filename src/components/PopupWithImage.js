import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._text = data.name;
    this._src = data.link;
  }

  openPopup() {
    const popupImage = this._popup.querySelector('.popup__photo-image');
    const popupText = this._popup.querySelector('.popup__photo-text');
    popupImage.alt = this._text;
    popupImage.src = this._src;
    popupText.textContent = this._text;
    super.openPopup();
  }
}
