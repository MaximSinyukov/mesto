export class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._object = document.querySelector(data.object);
  }

  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      object: this._object.textContent
    }
    return this._profile;
  }

  setUserInfo({name, object}) {
    this._name.textContent = name;
    this._object.textContent = object;
  }
}
