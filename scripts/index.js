const editButton = document.querySelector(".profile__edit-button");
const popupSection = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".form__save-button");
const userInput = document.querySelectorAll(".form__input");
const closeButton = document.querySelector(".popup__close-button");

function setName() {
  let profileName = document.querySelector(".profile__name").textContent;
  let profOccup = document.querySelector(".profile__occupation").textContent;

  userInput[0].value = profileName;
  userInput[1].value = profOccup;
}

function openPopup() {
  popupSection.classList.toggle("popup__opened");
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

editButton.addEventListener("click", function () {
  openPopup();
  setName();
});
popupCloseButton.addEventListener("click", openPopup);
popupSaveButton.addEventListener("click", function () {
  openPopup();
  changeName();
});
