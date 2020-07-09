import './index.css';
import {Card} from '../components/Card.js';
import {initialCards, formValidationOptions} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';

const editPopup = document.querySelector('#editPopup');
const profileForm = editPopup.querySelector('.popup__container');
const editButton = document.querySelector('.profile__edit-button');
const addPopup = document.querySelector('#addPopup');
const cardForm = addPopup.querySelector('.popup__container');
const addButton = document.querySelector('.profile__add-button');
const submitEdit = editPopup.querySelector('.popup__submit-button');
const submitAdd = addPopup.querySelector('.popup__submit-button');

const profileFormValidator = new FormValidator(formValidationOptions, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formValidationOptions, cardForm);
cardFormValidator.enableValidation();
const newProfile = new UserInfo({name: '.profile__author', object: '.profile__subject'});
const popupCard = new PopupWithImage('#photo');
popupCard.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#photo-grid',
    () => {
      popupCard.openPopup(item);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},'.cards');

cardsList.renderItems();

const popupProfile = new PopupWithForm('#editPopup', (newValue) => {
  newProfile.setUserInfo(newValue);
  popupProfile.closePopup();
});
popupProfile.setEventListeners();

const popupAdd = new PopupWithForm('#addPopup', (newValue) => {
  const cardsList = new Section({
    items: [newValue],
    renderer: (item) => {
      const {name, object: link} = item;
      const card = new Card({name, link}, '#photo-grid',
      () => {
        popupCard.openPopup({name, link});
      });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },'.cards');
  cardsList.renderItems();
  popupAdd.closePopup();
});
popupAdd.setEventListeners();

editButton.addEventListener('click', () => {
  profileFormValidator.hideInputErrors();
  profileFormValidator.onButton(submitEdit);
  const newInfo = newProfile.getUserInfo();
  document.querySelector('#name').value = newInfo.name;
  document.querySelector('#subject').value = newInfo.object;
  popupProfile.openPopup();
});

addButton.addEventListener('click', () => {
  cardFormValidator.hideInputErrors();
  cardFormValidator.offButton(submitAdd);
  popupAdd.openPopup();
})
