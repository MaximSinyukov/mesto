let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__container');

function openedClosed() {
  let name = document.querySelector('.profile__author');
  let subject = document.querySelector('.profile__subject');
  let formName = document.querySelector('.popup__form-name');
  let formSubject = document.querySelector('.popup__form-subject');
  formName.value = name.textContent;
  formSubject.value = subject.textContent;
  popup.classList.toggle('popup_opened');
};

function submitValue(evt) {
  evt.preventDefault();
  let formName = document.querySelector('.popup__form-name');
  let formSubject = document.querySelector('.popup__form-subject');
  let author = document.querySelector('.profile__author');
  let subject = document.querySelector('.profile__subject');
  author.textContent = formName.value;
  subject.textContent = formSubject.value;
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openedClosed);
closeButton.addEventListener('click', openedClosed);
popupForm.addEventListener('submit', submitValue);
