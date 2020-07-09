import {formValidationOptions} from '../utils/constants.js';

export class FormValidator {
  constructor(formValidationOptions, form) {
    this._formSelector = formValidationOptions.formSelector;
    this._inputSelector = formValidationOptions.inputSelector;
    this._submitButtonSelector = formValidationOptions.submitButtonSelector;
    this._inactiveButtonClass = formValidationOptions.inactiveButtonClass;
    this._inputErrorClass = formValidationOptions.inputErrorClass;
    this._errorClass = formValidationOptions.errorClass;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.offButton(buttonElement);
    } else {
      this.onButton(buttonElement);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.textContent = '';
  };

  hideInputErrors() {
    const inputList = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    inputList.forEach((input) => {this._hideInputError(input)});
  }

  offButton(buttonElement) {
    buttonElement.classList.add(`${formValidationOptions.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }

  onButton(buttonElement) {
    buttonElement.classList.remove(`${formValidationOptions.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }

  enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    const buttonElement = this._form.querySelector(`${this._submitButtonSelector}`);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}
