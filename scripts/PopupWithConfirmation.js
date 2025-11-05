import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmitCallback) {
    super(popupSelector);
    this._handleFormSubmitCallback = handleFormSubmitCallback;
    this._form = this._popup.querySelector(".form");
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmitCallback();
    });
  }
}
