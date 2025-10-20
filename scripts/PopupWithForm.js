import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitCallback) {
    super(popupSelector);
    this._handleFormSubmitCallback = handleFormSubmitCallback;
    this._form = this._popup.querySelector(".form");
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const _formValues = {};
    const inputList = this._form.querySelectorAll(".form__input");

    inputList.forEach((input) => {
      _formValues[input.name] = input.value;
    });

    return _formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
