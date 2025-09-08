const editButton = document.querySelector(".profile__edit-button");
const popupSection = document.querySelector(".popup");
const popupCardSection = document.querySelector(".popUpCard");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".form__save-button");
const userInput = document.querySelectorAll(".form__input");

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

function openPopUpCard() {
  popupCardSection.classList.toggle("popUpCard__opened");
  popupCardSection.classList.toggle("popUpCard");
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

// -----------------------------------------------------------

const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".gallery");
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

initialCards.forEach((cardData) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardsContainer.append(cardElement);
});

//--------------------------------------------------------------

const cardAddButton = document.querySelector(".profile__add-button");
const popUpCardSection = document.querySelector(".popUpCard");
const popUpCardCloseButton = document.querySelector(".popUpCard__close-button");
const popUpCardSaveButton = document.querySelector("#card-save-button");

function cardOpenPopup() {
  popUpCardSection.classList.toggle("popUpCard__opened");
  popUpCardSection.classList.toggle("popUpCard");
}

cardAddButton.addEventListener("click", cardOpenPopup);
popUpCardCloseButton.addEventListener("click", cardOpenPopup);
popUpCardSaveButton.addEventListener("click", (evt) => {
  addCard(evt);
  cardOpenPopup();
});

//--------------------------------------------------------------

const likeButtons = document.querySelectorAll(".gallery__card-like-button");

likeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.target.classList.toggle("gallery__card-like-button--clicked");
  });
});

function addCard(evt) {
  evt.preventDefault();
  const titleInput = document.querySelector("#place-input");
  const linkInput = document.querySelector("#link-input");

  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");

  cardImage.src = linkInput.value;
  cardImage.alt = titleInput.value;
  cardTitle.textContent = titleInput.value;

  cardsContainer.prepend(cardElement);

  titleInput.value = "";
  linkInput.value = "";
}

cardsContainer.addEventListener("click", (evt) => {
  if (evt.target.id === "trash-button") {
    const card = evt.target.closest(".gallery__card");
    card.remove();
  }
});

//------------------------------------------------------------
const imagePopUpSection = document.querySelector(".imagePopUp");
const imagePopUpCloseButton = document.querySelector(
  ".imagePopUp__close-button"
);

imagePopUpCloseButton.addEventListener("click", () => {
  const imagePopUp = document.querySelector(".imagePopUp");

  imagePopUp.classList.toggle("imagePopUp--opened");
  imagePopUp.classList.toggle("imagePopUp--closed");
});

cardsContainer.addEventListener("click", function (evt) {
  const card = evt.target.closest(".gallery__card");
  if (!card) return;

  if (evt.target.id === "trash-button") return;

  const cardImage = card.querySelector(".gallery__card-image");
  const originalLink = cardImage.src;
  const name = card.querySelector(".gallery__card-title");
  const popupImage = imagePopUpSection.querySelector(".imagePopUp__image");
  const imageTitle = imagePopUpSection.querySelector(".imagePopUp__title");

  popupImage.src = originalLink;
  imageTitle.textContent = name.textContent;

  imagePopUpSection.classList.toggle("imagePopUp--opened");
  imagePopUpSection.classList.toggle("imagePopUp--closed");
});
