import {formValidationOptions} from './index.js';

export const popupPhoto = document.querySelector('#photo');
const popupImage = popupPhoto.querySelector('.popup__photo-image');
const popupText = popupPhoto.querySelector('.popup__photo-text');

function escListener (evt) {
  const element = document.querySelector('.popup_opened');
  if (evt.keyCode === 27) {
    closePopup(element)
  }
}

function clickEmpty (evt) {
  const element = document.querySelector('.popup_opened');
  if (!(evt.target.closest('.popup__container') || evt.target.closest('.popup__photo-container'))) {
    closePopup(element)
  }
}

export function offButton(buttonElement) {
  buttonElement.classList.add(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
}

export function onButton(buttonElement) {
  buttonElement.classList.remove(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${formValidationOptions.inputErrorClass}`);
  errorElement.textContent = '';
};

export const openPopup = (element) => {
  const inputList = Array.from(element.querySelectorAll(`${formValidationOptions.inputSelector}`));
  inputList.forEach((input) => { hideInputError(element, input) });
  element.classList.add('popup_opened');
  element.addEventListener('click', clickEmpty);
  addEventListener('keydown', escListener);
};

export const closePopup = (element) => {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', clickEmpty);
  removeEventListener('keydown', escListener);
};

export function addCard(container, element) {
  container.prepend(element);
}

export function photoPopup(event) {
  popupImage.alt = event.target.alt;
  popupImage.src = event.target.src;
  popupText.textContent = event.target.alt;
  openPopup(popupPhoto);
}
