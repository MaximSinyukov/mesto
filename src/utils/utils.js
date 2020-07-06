import {formValidationOptions} from './constants.js';

export function offButton(buttonElement) {
  buttonElement.classList.add(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
}

export function onButton(buttonElement) {
  buttonElement.classList.remove(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}
