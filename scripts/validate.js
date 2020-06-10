const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`${formValidationOptions.inputSelector}`));
  const buttonElement = formElement.querySelector(`${formValidationOptions.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function offButton (buttonElement) {
  buttonElement.classList.add(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
}

function onButton (buttonElement) {
  buttonElement.classList.remove(`${formValidationOptions.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    offButton(buttonElement);
  } else {
    onButton(buttonElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${formValidationOptions.inputErrorClass}`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${formValidationOptions.inputErrorClass}`);
  errorElement.textContent = '';
};

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(`${options.formSelector}`));
  formList.forEach((form) => {
    setEventListeners(form);
  });
}
