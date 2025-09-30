// Profe: los comentarios en cada sección los agregué yo para entender mejor mi código, por favor no piense que usé IA o algo para hacerlo hahsdf

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

// Funciones

// -- Función para abrir pop-up
function openPopup(popupElement) {
  popupElement.classList.add("popup__opened");
}

// -- Función para cerrar pop-up
function closePopup(popupElement) {
  popupElement.classList.remove("popup__opened");
}

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

// Event Listeners

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
