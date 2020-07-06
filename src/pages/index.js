import './index.css';
import {Card} from '../components/Card.js';
import {initialCards, profileForm, editButton, cardForm, addButton, submitEdit, submitAdd, formValidationOptions} from '../utils/constants.js';
import {onButton, offButton} from '../utils/utils.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';

const profileFormValidator = new FormValidator(formValidationOptions, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formValidationOptions, cardForm);
cardFormValidator.enableValidation();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#photo-grid',
    () => {
      const popupCard = new PopupWithImage(item, '#photo');
      popupCard.setEventListeners();
      popupCard.openPopup();
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},'.cards');

cardsList.renderItems();

editButton.addEventListener('click', () => {
  const newProfile = new UserInfo({name: '.profile__author', object: '.profile__subject'});
  const popupProfile = new PopupWithForm({name: '#name', object: '#subject'}, '#editPopup', (evt) => {
    evt.preventDefault();
    newProfile.setUserInfo(popupProfile._getInputValues());
    popupProfile.closePopup();
  });
  profileFormValidator.hideInputErrors();
  onButton(submitEdit);
  popupProfile.openPopup(newProfile.getUserInfo());
  popupProfile.setEventListeners();
});

addButton.addEventListener('click', () => {
  const popupAdd = new PopupWithForm({name: '#place', object: '#source'}, '#addPopup', (evt) => {
    evt.preventDefault();
    const cardsList = new Section({
      items: [popupAdd._getInputValues()],
      renderer: (item) => {
        const {name, object: link} = item;
        const card = new Card({name, link}, '#photo-grid',
        () => {
          const popupCard = new PopupWithImage({name, link}, '#photo');
          popupCard.setEventListeners();
          popupCard.openPopup();
        });
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      },
    },'.cards');
    cardsList.renderItems();
    popupAdd.closePopup();
  });
  cardFormValidator.hideInputErrors();
  offButton(submitAdd);
  popupAdd.setEventListeners();
  popupAdd.openPopup({name: '', object: ''});
})
