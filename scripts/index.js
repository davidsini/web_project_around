import Api from "./Api.js";
import FormValidator from "./formValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Card from "./card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

// ---------------------------------------------------------------
//  SPRINT 12
// ---------------------------------------------------------------

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "0727e918-236a-4454-ba88-94aa79b3a1d2",
    "Content-Type": "application/json",
  },
});

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
const profileAvatar = document.querySelector(".profile__picture");

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
cardAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

// ---------------------------------------------------------------
// SPRINT 11 Y 12, LO CAMBIÉ UN POQUIS
// ---------------------------------------------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  occupationSelector: ".profile__occupation",
});

const profileEditPopup = new PopupWithForm(".popup", (formData) => {
  const saveButton = profileEditPopup._form.querySelector(".form__save-button");
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Guardando...";

  api
    .editUserInfo({ name: formData.name, about: formData.occupation })
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        occupation: updatedUserData.about,
      });
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popUpCard", (formData) => {
  const saveButton = addCardPopup._form.querySelector(".form__save-button");
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Guardando...";

  api
    .addNewCard(formData)
    .then((newCardData) => {
      const card = new Card(
        newCardData,
        "#card-template",
        currentUserId,
        (name, link) => {
          imagePreviewPopup.open(name, link);
        },
        (cardInstance) => {
          cardToDelete = cardInstance;
          confirmationPopup.open();
        },
        (cardInstance) => {
          if (cardInstance.isLiked()) {
            api
              .removeLike(cardInstance._id)
              .then((updatedCardData) => {
                cardInstance.updateLikeStatus(updatedCardData.likes);
              })
              .catch((err) => console.log(err));
          } else {
            api
              .addLike(cardInstance._id)
              .then((updatedCardData) => {
                cardInstance.updateLikeStatus(updatedCardData.likes);
              })
              .catch((err) => console.log(err));
          }
        }
      );

      const cardElement = card.generateCard();
      cardListSection.addItem(cardElement, true);
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
});
addCardPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage(".imagePopUp");
imagePreviewPopup.setEventListeners();

// ---------------------------------------------------------------
// RENDERIZADO DE TARJETAS (SPRINT 12)
// ---------------------------------------------------------------

const avatarEditPopup = new PopupWithForm(".popup_type_avatar", (formData) => {
  const saveButton = avatarEditPopup._form.querySelector(".form__save-button");
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Guardando...";

  api
    .updateUserAvatar(formData)
    .then((updatedUserData) => {
      profileAvatar.src = updatedUserData.avatar;
      avatarEditPopup.close();
    })
    .catch((err) => {})
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
});
avatarEditPopup.setEventListeners();

profileAvatar.addEventListener("click", () => {
  avatarEditPopup.open();
});

let cardIdToDelete = null;
let cardElementToDelete = null;
let cardToDelete = null;

const confirmationPopup = new PopupWithConfirmation(
  ".popup_type_confirm",
  () => {
    const saveButton =
      confirmationPopup._form.querySelector(".form__save-button");
    const originalButtonText = saveButton.textContent;
    saveButton.textContent = "Guardando...";

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        cardToDelete.remove();
        confirmationPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        saveButton.textContent = originalButtonText;
        cardToDelete = null;
      });
  }
);
confirmationPopup.setEventListeners();

let currentUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCardsData]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      occupation: userData.about,
    });

    profileAvatar.src = userData.avatar;

    const cardListSection = new Section(
      {
        items: initialCardsData,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            currentUserId,
            (name, link) => {
              imagePreviewPopup.open(name, link);
            },
            (cardInstance) => {
              cardToDelete = cardInstance;
              confirmationPopup.open();
            },
            (cardInstance) => {
              if (cardInstance.isLiked()) {
                api
                  .removeLike(cardInstance._id)
                  .then((updatedCardData) => {
                    cardInstance.updateLikeStatus(updatedCardData.likes);
                  })
                  .catch((err) => console.log(err));
              } else {
                api
                  .addLike(cardInstance._id)
                  .then((updatedCardData) => {
                    cardInstance.updateLikeStatus(updatedCardData.likes);
                  })
                  .catch((err) => console.log(err));
              }
            }
          );

          const cardElement = card.generateCard();
          return cardElement;
        },
      },
      ".gallery"
    );

    cardListSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
