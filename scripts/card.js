export default class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleCardClick,
    handleDeleteIconClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._ownerId = data.owner;

    this._userId = userId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    return cardElement;
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  updateLikeStatus(newLikesData) {
    this._likes = newLikesData;
    this._updateLikeView();
  }

  _updateLikeView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("gallery__card-like-button--clicked");
    } else {
      this._likeButton.classList.remove("gallery__card-like-button--clicked");
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(
      ".gallery__card-like-button"
    );
    this._trashButton = this._element.querySelector(".gallery__trash-button");
    this._cardImage = this._element.querySelector(".gallery__card-image");
    const cardTitle = this._element.querySelector(".gallery__card-title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = "none";
    }

    this._updateLikeView();

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
