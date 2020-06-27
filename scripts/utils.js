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

export const openPopup = (element) => {
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

export function openPhotoPopup(title, link) {
  popupImage.alt = title;
  popupImage.src = link;
  popupText.textContent = title;
  openPopup(popupPhoto);
}
