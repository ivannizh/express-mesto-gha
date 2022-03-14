export class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error while fetching data: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(
      `${this._url}/cards`,
      {
        method: 'GET',
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  updateUserInfo({
    name,
    about
  }) {
    return fetch(
      `${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify(
          {
            name: name,
            about: about,
          }
        ),
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  addNewCard({
    name,
    link
  }) {
    return fetch(
      `${this._url}/cards`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(id, newStatus) {
    return newStatus ? this.likeCard(id) : this.unlikeCard(id);
  }

  likeCard(cardId) {
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json', },
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  unlikeCard(cardId) {
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', },
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(
      `${this._url}/cards/${cardId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  updateAvatar(newURL) {
    return fetch(
      `${this._url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify({ avatar: newURL, }
        ),
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  signup({
    email,
    password
  }) {
    return fetch(
      `${this._url}/signup`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify({
          password,
          email
        }),
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  signin({
    email,
    password
  }) {
    return fetch(
      `${this._url}/signin`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify({
          password,
          email
        }),
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  signout() {
    return fetch(
      `${this._url}/signout`,
      {
        method: 'POST',
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(
      `${this._url}/users/me`,
      {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
      })
      .then(this._getResponseData);
  }

}

const api = new Api(
  'https://api.ivannizh.nomoredomains.work'
);

export default api;
