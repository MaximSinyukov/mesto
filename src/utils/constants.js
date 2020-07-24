export const formValidationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__text-error'
};

export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '76346dd7-8de1-4cc7-a3b8-f91fff5a3b7d',
    'Content-Type': 'application/json'
  }
};
