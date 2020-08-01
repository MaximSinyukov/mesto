import {Popup} from './Popup.js';
import {formValidationOptions} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._submit = submitForm;
  }

  _getInputValues() {
    this.newProfile = {};
    const inputList = Array.from(this._popup.querySelectorAll(`${formValidationOptions.inputSelector}`));
    inputList.forEach((input) => {
      this.newProfile[`${input.name}`] = input.value;
    });
    return this.newProfile;
  }

  loadingResult(loadingText) {
      this._submitButton.textContent = loadingText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    setTimeout(() => {
      this._popup.querySelector(formValidationOptions.formSelector).reset();
    }, 500);
  }
}
