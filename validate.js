function enableValidation(options) {
 const formList = Array.from(document.querySelectorAll(`${options.formSelector}`));
 formList.forEach((form) => {
  setEventListeners(form);
 });
};
