import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(data, popupSelector, SubmitForm) {
    super(popupSelector);
    this._submit = SubmitForm;
    this._name = this._popup.querySelector(data.name);
    this._object = this._popup.querySelector(data.object);
  }

  _getInputValues() {
    this.newProfile = {
      name: this._name.value,
      object: this._object.value
    }
    return this.newProfile;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }

  openPopup(data) {
    this._name.value = data.name;
    this._object.value = data.object;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._popup.removeEventListener('submit', this._submit);
  }
}
