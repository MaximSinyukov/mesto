const initialCards = [
  {
      name: 'Попугай',
      link: 'https://images.unsplash.com/photo-1501720804996-ae418d1ba820?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1345&q=80'
  },
  {
      name: 'Зяблик',
      link: 'https://images.unsplash.com/photo-1579057881263-b9b412b0783f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Кардинал',
      link: 'https://images.unsplash.com/photo-1571100030164-80d05219a570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
  },
  {
      name: 'Щегол',
      link: 'https://images.unsplash.com/photo-1589595363745-d842812a9db7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
  },
  {
      name: 'Птичка',
      link: 'https://images.unsplash.com/photo-1541971126-d98efa910469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1447&q=80'
  },
  {
      name: 'Неразлучники',
      link: 'https://images.unsplash.com/photo-1518001335271-e104dd5f03f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  }
];
let popupForm = document.querySelector('#form');
let popupPhoto = document.querySelector('#photo');
let name = document.querySelector('.profile__author');
let subject = document.querySelector('.profile__subject');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.page');
const photoContainer = document.querySelector('.elements');

function editPopup() {
  popupForm.querySelector('#name').value = '';
  popupForm.querySelector('#subject').value = '';
  popupForm.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popupForm.classList.toggle('popup_opened');
  popupForm.querySelector('#name').value = name.textContent;
  popupForm.querySelector('#name').setAttribute('placeholder', 'Имя');
  popupForm.querySelector('#subject').value = subject.textContent;
  popupForm.querySelector('#subject').setAttribute('placeholder', 'О себе');
  popupForm.querySelector('.popup__submit-button').textContent = 'Сохранить';
}

function addPopup() {
  popupForm.querySelector('#name').value = '';
  popupForm.querySelector('#subject').value = '';
  popupForm.querySelector('.popup__title').textContent = 'Новое место';
  popupForm.querySelector('#name').setAttribute('placeholder', 'Название');
  popupForm.querySelector('#subject').setAttribute('placeholder', 'Ссылка на картинку');
  popupForm.querySelector('.popup__submit-button').textContent = 'Создать';
  popupForm.classList.toggle('popup_opened');
}

function submitValue(evt) {
  evt.preventDefault();
  const inputName = popupForm.querySelector('#name').value;
  const inputSubject = popupForm.querySelector('#subject').value;
  if (popupForm.querySelector('.popup__submit-button').textContent === 'Сохранить') {
    name.textContent = inputName;
    subject.textContent = inputSubject;
    popupForm.classList.toggle('popup_opened');
  } else {
    const photoTemplate = document.querySelector('#photo-grid').content;
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.element__image').setAttribute('src',inputSubject);
    photoElement.querySelector('.element__image').setAttribute('alt', inputName);
    photoElement.querySelector('.element__text').textContent = inputName;
    photoContainer.prepend(photoElement);
    popupForm.classList.toggle('popup_opened');

  }
}

function closePopup(event) {
  if (event.target.className === 'popup__close-button') {
    event.target.closest('.popup').classList.toggle('popup_opened');
  }
}

const addLike = function(event) {
  if (event.target.id === 'like') {
    event.target.classList.toggle('element__like-button_active');
  }
};

const removeItem = function(event) {
  if (event.target.className === 'element__trash-button') {
    event.target.closest('.element').remove();
  }
}

const photoPopup = function(event) {
  if (event.target.className === 'element__image') {
    const photo = event.target.closest('.element');
    popupPhoto.querySelector('.popup__photo-image').setAttribute('alt', photo.querySelector('.element__image').getAttribute('alt'));
    popupPhoto.querySelector('.popup__photo-image').setAttribute('src', photo.querySelector('.element__image').getAttribute('src'));
    popupPhoto.querySelector('.popup__photo-text').textContent = photo.querySelector('.element__text').textContent;
    popupPhoto.classList.toggle('popup_opened');
  }
}

initialCards.forEach((object) => {
  const photoTemplate = document.querySelector('#photo-grid').content;
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.element__image').setAttribute('src', object.link);
  photoElement.querySelector('.element__image').setAttribute('alt', object.name);
  photoElement.querySelector('.element__text').textContent = object.name;
  photoContainer.append(photoElement);
});

photoContainer.addEventListener('click', photoPopup);
photoContainer.addEventListener('click', addLike);
photoContainer.addEventListener('click', removeItem);
editButton.addEventListener('click', editPopup);
addButton.addEventListener('click', addPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitValue);
