import './index.css';
import {Card} from '../components/Card.js';
import {formValidationOptions, config} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

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
const avatarImg = document.querySelector('.profile__img');
const editAvatar = document.querySelector('.profile__overlay');
const avatarPopup = document.querySelector('#avatarPopup');
const inputAvatar = avatarPopup.querySelector('#source');

/////////////Экземпляры классов

const api = new Api(config);

const profileFormValidator = new FormValidator(formValidationOptions, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formValidationOptions, cardForm);
cardFormValidator.enableValidation();

const newProfile = new UserInfo({name: '.profile__author', object: '.profile__subject'});

const popupCard = new PopupWithImage('#photo');
popupCard.setEventListeners();

const popupProfile = new PopupWithForm('#editPopup', (newValue) => {
  popupProfile.loadingResult('Сохранение...');
  api.updateProfileInfo(newValue)
    .then((userData) => {
      newProfile.setUserInfo({name: userData.name, object: userData.about});
      popupProfile.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка при изменении профиля: ${err}`);
    })
    .finally(() => {
      popupProfile.loadingResult('Сохранить');
    });
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm('#avatarPopup', (newAvatar) => {
  popupAvatar.loadingResult('Сохраняем...');
  api.updateProfileAvatar(newAvatar)
    .then((res) => {
      avatarImg.src = res.avatar;
    })
    .then(() => {
      popupAvatar.closePopup();
      popupAvatar.loadingResult('Сохранить');
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке аватарки: ${err}`);
    });
});
popupAvatar.setEventListeners();

const popupConfirm = new PopupWithForm('#confirmPopup', () => {
  popupConfirm.loadingResult('Удаляем...');
});
popupConfirm.setEventListeners();

const popupAdd = new PopupWithForm('#addPopup', (newValue) => {
  popupAdd.loadingResult('Создание...');
  api.createCard(newValue)
    .then((cardData) => {
      const cardsList = new Section({items: [cardData], renderer: (item) => {
        const card = new Card(item, '#photo-grid', item.owner._id, popupConfirm,
        () => {
          api.deleteCard(card.cardId)
            .then(() => {
              card.deleteElement();
              card.deleteListener();
            })
            .then(() => {
              popupConfirm.closePopup();
              popupConfirm.loadingResult('Да');
            })
            .catch((err) => {
              console.log(`Карточка не удаляется: ${err}`);
            })
          },
          (id) => {
            api.createLike(id)
              .then((res) => {
                card.likes = res.likes;
                card.element.querySelector('.card__like-counter').textContent = res.likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка в добавлении лайка: ${err}`);
              })
          },
          (id) => {
            api.deleteLike(id)
              .then((res) => {
                card.likes = res.likes;
                card.element.querySelector('.card__like-counter').textContent = res.likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка в удалении лайка: ${err}`);
              })
          },
        () => {
          popupCard.openPopup(item);
        });
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      },
    }, '.cards');
      cardsList.renderItems();
      popupAdd.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      popupAdd.loadingResult('Создать');
    })
});
popupAdd.setEventListeners();

/////////////рендер страницы

api.getUser()
  .then((userData) => {
    newProfile.setUserInfo({name: userData.name, object: userData.about});
    avatarImg.src = userData.avatar;
    return userData._id;
  })
  .then((userId) => {
    api.getInitialCards()
    .then((arr) => {
      const cardsList = new Section({
        items: arr,
        renderer: (item) => {
          const card = new Card(item, '#photo-grid', userId,
          popupConfirm,
          () => {
            api.deleteCard(card.cardId)
              .then(() => {
                card.deleteElement();
                card.deleteListener();
              })
              .catch((err) => {
                console.log(`Карточка не удаляется: ${err}`);
              })
          },
          (id) => {
            api.createLike(id)
              .then((res) => {
                card.likes = res.likes;
                card.element.querySelector('.card__like-counter').textContent = res.likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка в добавлении лайка: ${err}`);
              })
          },
          (id) => {
            api.deleteLike(id)
              .then((res) => {
                card.likes = res.likes;
                card.element.querySelector('.card__like-counter').textContent = res.likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка в удалении лайка: ${err}`);
              })
          },
          () => {
            popupCard.openPopup(item);
          });
          const cardElement = card.generateCard();
          cardsList.addItems(cardElement);
        },
      },'.cards');
      cardsList.renderItems();
    })
    .catch((err) => {
      console.log(`Ошибка в рендере массива карт: ${err}`);
    })
  })
  .catch((err) => {console.log(`Ошибка в полученных данных: ${err}`)});

//////////////Установка слушателей на кнопки

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

editAvatar.addEventListener('click', () => {
  inputAvatar.value = avatarImg.src;
  popupAvatar.openPopup();
})
