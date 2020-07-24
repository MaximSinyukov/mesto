export class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  }

  _handleResponseError(err){
    return Promise.reject(err.message);
  }

  getUser() {
    return fetch(`${this.url}/users/me`, { headers: this.headers})
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers})
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  updateProfileInfo(data) {
    return fetch(`${this.url}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  updateProfileAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  createCard(data) {
    return fetch(`${this.url}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  createLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }
}
