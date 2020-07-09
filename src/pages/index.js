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
const nameForm = document.querySelector('#name');
const subjectForm = document.querySelector('#subject');

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
  cardsList.renderedItems = [newValue];
  cardsList.renderer = (item) => {
        const {name, object: link} = item;
        const card = new Card({name, link}, '#photo-grid',
        () => {
          popupCard.openPopup({name, link});
        });
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      }
  cardsList.renderItems();
  popupAdd.closePopup();
});
popupAdd.setEventListeners();

editButton.addEventListener('click', () => {
  profileFormValidator.hideInputErrors();
  profileFormValidator.onButton(submitEdit);
  const newInfo = newProfile.getUserInfo();
  nameForm.value = newInfo.name;
  subjectForm.value = newInfo.object;
  popupProfile.openPopup();
});

addButton.addEventListener('click', () => {
  cardFormValidator.hideInputErrors();
  cardFormValidator.offButton(submitAdd);
  popupAdd.openPopup();
})
