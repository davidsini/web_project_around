export default class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      occupation: this._occupationElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._occupationElement.textContent = data.occupation;
  }
}
