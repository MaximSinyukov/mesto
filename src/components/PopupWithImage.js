import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(data) {
    const popupImage = this._popup.querySelector('.popup__photo-image');
    const popupText = this._popup.querySelector('.popup__photo-text');
    popupImage.alt = data.name;
    popupImage.src = data.link;
    popupText.textContent = data.name;
    super.openPopup();
  }
}
