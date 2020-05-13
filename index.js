const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__container');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__author');
let subject = document.querySelector('.profile__subject');
let formName = document.getElementById('name');
let formSubject = document.getElementById('subject')

function openedClosed() {
  formName.value = name.textContent;
  formSubject.value = subject.textContent;
  popup.classList.toggle('popup_opened');
};

function submitValue(evt) {
  evt.preventDefault();
  name.textContent = formName.value;
  subject.textContent = formSubject.value;
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openedClosed);
closeButton.addEventListener('click', openedClosed);
popupForm.addEventListener('submit', submitValue);
