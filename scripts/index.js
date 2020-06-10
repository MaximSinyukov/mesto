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
const popupPhoto = document.querySelector('#photo');
const popupImage = popupPhoto.querySelector('.popup__photo-image');
const popupText = popupPhoto.querySelector('.popup__photo-text');
const closePhoto = popupPhoto.querySelector('.popup__close-button');
const photoTemplate = document.querySelector('#photo-grid').content;
const addForm = document.forms.addForm;
const submitEdit = editPopup.querySelector('.popup__submit-button');
const submitAdd = addPopup.querySelector('.popup__submit-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
const formValidationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__text-error'
};

const openPopup = (element) => {
  const inputList = Array.from(element.querySelectorAll(`${formValidationOptions.inputSelector}`));
  inputList.forEach((input) => { hideInputError(element, input) });
  element.classList.add('popup_opened');
  element.addEventListener('click', function (evt) {
    if (!(evt.target.closest('.popup__container') || evt.target.closest('.popup__photo-container'))) {
      closePopup(element)
    }
  });
  addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup(element)
    }
  });
};

const closePopup = (element) => {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', function (evt) {
    if (!(evt.target.closest('.popup__container') || evt.target.closest('.popup__photo-container'))) {
      closePopup(element)
    }
  });
  removeEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup(element)
    }
  });
};

function createEdit() {
  editName.value = author.textContent;
  editSubject.value = subject.textContent;
  submitEdit.classList.remove(`${formValidationOptions.inactiveButtonClass}`);
  openPopup(editPopup);
}

function createAdd() {
  addForm.reset();
  submitAdd.classList.add(`${formValidationOptions.inactiveButtonClass}`);
  openPopup(addPopup);
}

function createCard(image, text) {
  const photoBlock = photoTemplate.cloneNode(true);
  const photoImage = photoBlock.querySelector('.card__image');
  const photoText = photoBlock.querySelector('.card__text');
  photoImage.src = image;
  photoImage.alt = text;
  photoText.textContent = text;
  return photoBlock;
}

function addCard(container, element) {
  container.prepend(element);
}

function submitProfile(evt) {
  evt.preventDefault();
  author.textContent = editName.value;
  subject.textContent = editSubject.value;
  closePopup(editPopup);
}

function submitPhoto(evt) {
  evt.preventDefault();
  addCard(photoContainer, createCard(addSource.value, addName.value));
  closePopup(addPopup);
}

const addLike = (event) => {
  if (event.target.id === 'like') {
    event.target.classList.toggle('card__like-button_active');
  }
};

const removeItem = (event) => {
  if (event.target.className === 'card__trash-button') {
    event.target.closest('.card').remove();
  }
};

const photoPopup = (event) => {
  if (event.target.className === 'card__image') {
    popupImage.alt = event.target.alt;
    popupImage.src = event.target.src;
    popupText.textContent = event.target.alt;
    openPopup(popupPhoto);
  }
};

editButton.addEventListener('click', createEdit);
addButton.addEventListener('click', createAdd);
closeEdit.addEventListener('click', () => closePopup(editPopup));
closeAdd.addEventListener('click', () => closePopup(addPopup));
closePhoto.addEventListener('click', () => closePopup(popupPhoto));
editPopup.addEventListener('submit', submitProfile);
addPopup.addEventListener('submit', submitPhoto);
photoContainer.addEventListener('click', addLike);
photoContainer.addEventListener('click', removeItem);
photoContainer.addEventListener('click', photoPopup);
initialCards.forEach((object) => { addCard(photoContainer, createCard(object.link, object.name)) });
enableValidation(formValidationOptions);
