// Importar de los otros archivos
import { openPopup, closePopup } from "./utils.js";
import Card from "./card.js";
import FormValidator from "./formValidator.js";

// Objeto settings para formValidator
const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// ---------------------------------------------------------------
//  DEFINIR CONSTANTES
// ---------------------------------------------------------------
const editButton = document.querySelector(".profile__edit-button");
const popupSection = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".form__save-button");
const userInput = document.querySelectorAll(".form__input");

const cardAddButton = document.querySelector(".profile__add-button");
const popUpCardSection = document.querySelector(".popUpCard");
const popUpCardCloseButton = document.querySelector(".popUpCard__close-button");
const popUpCardSaveButton = document.querySelector("#card-save-button");
const titleInput = document.querySelector("#place-input");
const linkInput = document.querySelector("#link-input");

const cardsContainer = document.querySelector(".gallery");
const imagePopUpSection = document.querySelector(".imagePopUp");
const imagePopUpCloseButton = document.querySelector(
  ".imagePopUp__close-button"
);

// Now define the form variables using the constants from above
const editProfileForm = popupSection.querySelector(".form");
const addCardForm = popUpCardSection.querySelector(".form");

// ---------------------------------------------------------------
//  HACER QUE ESAS CONSTANTES HAGAN ALGO
// ---------------------------------------------------------------

// Nueva instancia para el form del profile
const editFormValidator = new FormValidator(
  validationSettings,
  editProfileForm
);
editFormValidator.enableValidation();

// Nueva instancia para el form de la tarjeta
const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();

// ---------------------------------------------------------------
//  INFO Y FUNCIONES
// ---------------------------------------------------------------

// Datos de las tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// -- Lógica para el formulario de perfil
function setName() {
  let profileName = document.querySelector(".profile__name").textContent;
  let profOccup = document.querySelector(".profile__occupation").textContent;
  userInput[0].value = profileName;
  userInput[1].value = profOccup;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profOccup = document.querySelector(".profile__occupation");
  profileName.textContent = userInput[0].value;
  profOccup.textContent = userInput[1].value;
  closePopup(popupSection);
}

// Crear Card, reutilizable
function createCard(item) {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

// -- Renderizado inicial
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsContainer.append(cardElement);
});

// -- Añadir  nueva tarjeta
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);

  titleInput.value = "";
  linkInput.value = "";
  closePopup(popUpCardSection);
}

// ---------------------------------------------------------------
//  EVENT LISTENERS
// ---------------------------------------------------------------

// -- Perfil
editButton.addEventListener("click", () => {
  setName();
  openPopup(popupSection);
});
popupCloseButton.addEventListener("click", () => closePopup(popupSection));
popupSaveButton.addEventListener("click", handleProfileFormSubmit);

// -- Añadir tarjeta
cardAddButton.addEventListener("click", () => openPopup(popUpCardSection));
popUpCardCloseButton.addEventListener("click", () =>
  closePopup(popUpCardSection)
);
popUpCardSaveButton.addEventListener("click", handleAddCardSubmit);

// -- Cerrar pop-up de imagen
imagePopUpCloseButton.addEventListener("click", () =>
  closePopup(imagePopUpSection)
);
