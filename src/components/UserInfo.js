export class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._object = document.querySelector(data.object);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      object: this._object.textContent,
    }
    return this._profile;
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  setUserInfo({name, object}) {
    this._name.textContent = name;
    this._object.textContent = object;
  }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}

