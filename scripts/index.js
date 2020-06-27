import {Card} from './Card.js';
import {initialCards} from './data.js';
import {openPopup, closePopup, popupPhoto, addCard, onButton, offButton} from './utils.js';
import {FormValidator} from './FormValidator.js';

const closePhoto = popupPhoto.querySelector('.popup__close-button');
const editPopup = document.querySelector('#editPopup');
const editButton = document.querySelector('.profile__edit-button');
const closeEdit = editPopup.querySelector('.popup__close-button');
const editName = editPopup.querySelector('#name');
const editSubject = editPopup.querySelector('#subject');
const addPopup = document.querySelector('#addPopup');
const addButton = document.querySelector('.profile__add-button');
const closeAdd = addPopup.querySelector('.popup__close-button');
const addName = addPopup.querySelector('#place');
const addSource = addPopup.querySelector('#source');
const author = document.querySelector('.profile__author');
const subject = document.querySelector('.profile__subject');
const photoContainer = document.querySelector('.cards');
const addForm = document.forms.addForm;
const submitEdit = editPopup.querySelector('.popup__submit-button');
const submitAdd = addPopup.querySelector('.popup__submit-button');
export const formValidationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__text-error'
};
const formList = Array.from(document.querySelectorAll(`${formValidationOptions.formSelector}`));

function createEdit() {
  editName.value = author.textContent;
  editSubject.value = subject.textContent;
  onButton(submitEdit);
  openPopup(editPopup);
}

function createAdd() {
  addForm.reset();
  offButton(submitAdd);
  openPopup(addPopup);
}

function submitProfile(evt) {
  evt.preventDefault();
  author.textContent = editName.value;
  subject.textContent = editSubject.value;
  closePopup(editPopup);
}

function submitPhoto(evt) {
  evt.preventDefault();
  const card = new Card(addName.value, addSource.value, '#photo-grid');
  addCard(photoContainer, card.generateCard());
  closePopup(addPopup);
}

editButton.addEventListener('click', createEdit);
addButton.addEventListener('click', createAdd);
closeEdit.addEventListener('click', () => closePopup(editPopup));
closeAdd.addEventListener('click', () => closePopup(addPopup));
closePhoto.addEventListener('click', () => closePopup(popupPhoto));
editPopup.addEventListener('submit', submitProfile);
addPopup.addEventListener('submit', submitPhoto);
initialCards.forEach((object) => {
  const card = new Card(object.name, object.link, '#photo-grid');
  addCard(photoContainer, card.generateCard());
});
formList.forEach((item) => {
const form = new FormValidator(formValidationOptions, item)
form.enableValidation();
});
