let editButton = document.querySelector(".profile__edit-button");
let popupSection = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupSaveButton = document.querySelector(".form__save-button");
let userInput = document.querySelectorAll(".form__input");

function openPopup() {
  popupSection.classList.toggle("visible");
  popupSection.classList.toggle("popup");
}

function changeName() {
  let profileName = document.querySelector(".profile__name");
  let profOccup = document.querySelector(".profile__occupation");

  if (userInput[0].value.length >= 1) {
    profileName.textContent = userInput[0].value;
  }

  if (userInput[1].value.length >= 1) {
    profOccup.textContent = userInput[1].value;
  }
}

editButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", openPopup);
popupSaveButton.addEventListener("click", function () {
  openPopup();
  changeName();
});
