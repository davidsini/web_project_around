import Card from "./Card.js";
import FormValidator from "./formValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopUpWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

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
const userInput = document.querySelectorAll(".form__input");
const cardAddButton = document.querySelector(".profile__add-button");
const popUpCardSection = document.querySelector(".popUpCard");
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

// ---------------------------------------------------------------
//  EVENT LISTENERS
// ---------------------------------------------------------------

// -- Perfil
editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  userInput[0].value = currentUserInfo.name;
  userInput[1].value = currentUserInfo.occupation;

  profileEditPopup.open();
});

// -- Añadir tarjeta
// cardAddButton.addEventListener("click", () => openPopup(popUpCardSection));
cardAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

// ---------------------------------------------------------------
// SPRINT 11
// ---------------------------------------------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  occupationSelector: ".profile__occupation",
});

const profileEditPopup = new PopupWithForm(".popup", (formData) => {
  userInfo.setUserInfo(formData);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popUpCard", (formData) => {
  const newCard = new Card(formData, "#card-template", (name, link) => {
    imagePreviewPopup.open(name, link);
  });
  const newCardElement = newCard.generateCard();

  cardListSection.addItem(newCardElement, true);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage(".imagePopUp");
imagePreviewPopup.setEventListeners();

const cardListSection = new Section(
  {
    items: initialCards,

    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        imagePreviewPopup.open(name, link);
      });

      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".gallery"
);

cardListSection.renderItems();
