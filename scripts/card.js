class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".gallery__card-image");
    const cardTitle = this._element.querySelector(".gallery__card-title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(
      ".gallery__card-like-button"
    );
    this._trashButton = this._element.querySelector(".gallery__trash-button");
    this._cardImage = this._element.querySelector(".gallery__card-image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("gallery__card-like-button--clicked");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    const imagePopUpSection = document.querySelector(".imagePopUp");
    const popupImage = imagePopUpSection.querySelector(".imagePopUp__image");
    const imageTitle = imagePopUpSection.querySelector(".imagePopUp__title");

    popupImage.src = this._link;
    imageTitle.textContent = this._name;

    imagePopUpSection.classList.toggle("imagePopUp--opened");
    imagePopUpSection.classList.toggle("imagePopUp--closed");
  }
}

export default Card;
