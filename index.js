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
const editForm = document.querySelector('#editForm');
const editButton = document.querySelector('.profile__edit-button');
const closeEdit = editForm.querySelector('.popup__close-button');
const submitEdit = editForm.querySelector('.popup__submit-button');
const editName = editForm.querySelector('#name');
const editSubject = editForm.querySelector('#subject');
const addForm = document.querySelector('#addForm');
const addButton = document.querySelector('.profile__add-button');
const closeAdd = addForm.querySelector('.popup__close-button');
const submitCard = addForm.querySelector('.popup__submit-button');
const addName = addForm.querySelector('#place');
const addSource = addForm.querySelector('#source');
const author = document.querySelector('.profile__author');
const subject = document.querySelector('.profile__subject');
const photoContainer = document.querySelector('.cards');
const popupPhoto = document.querySelector('#photo');
const popupImage = popupPhoto.querySelector('.popup__photo-image');
const popupText = popupPhoto.querySelector('.popup__photo-text');
const closePhoto = popupPhoto.querySelector('.popup__close-button');
const photoTemplate = document.querySelector('#photo-grid').content;


const openPopup = (element) => {element.classList.add('popup_opened')};

const closePopup = (element) => {element.classList.remove('popup_opened')};

function createEdit() {
  editName.value = author.textContent;
  editSubject.value = subject.textContent;
  openPopup(editForm);
}

function createAdd() {
  openPopup(addForm);
};

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
  closePopup(editForm);
}

function submitPhoto(evt) {
  evt.preventDefault();
  addCard(photoContainer, createCard(addSource.value, addName.value));
  closePopup(addForm);
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
}

const photoPopup = (event) => {
  if (event.target.className === 'card__image') {
    popupImage.alt = event.target.alt;
    popupImage.src = event.target.src;
    popupText.textContent = event.target.alt;
    openPopup(popupPhoto);
  }
}

editButton.addEventListener('click', createEdit);
addButton.addEventListener('click', createAdd);
closeEdit.addEventListener('click', () => closePopup(editForm));
closeAdd.addEventListener('click', () => closePopup(addForm));
closePhoto.addEventListener('click', () => closePopup(popupPhoto));
editForm.addEventListener('submit', submitProfile);
addForm.addEventListener('submit', submitPhoto);
photoContainer.addEventListener('click', addLike);
photoContainer.addEventListener('click', removeItem);
photoContainer.addEventListener('click', photoPopup);
initialCards.forEach(function (object) { addCard(photoContainer, createCard(object.link, object.name)) });
