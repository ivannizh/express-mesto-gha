export class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
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
                headers: {
                    'Authorization': this._token,
                },
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    updateUserInfo({name, about}) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: name,
                        about: about,
                    }
                ),
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    addNewCard({name, link}) {
        return fetch(
            `${this._url}/cards`,
            {
                method: 'POST',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: name,
                        link: link,
                    }
                ),
                credentials: 'include',
            })
            .then(this._getResponseData)
    }
    changeLikeCardStatus(id, newStatus) {
        return newStatus ? this.likeCard(id) : this.unlikeCard(id)
    }


    likeCard(cardId) {
        return fetch(
            `${this._url}/cards/likes/${cardId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    unlikeCard(cardId) {
        return fetch(
            `${this._url}/cards/likes/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(
            `${this._url}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this._token,
                },
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    updateAvatar(newURL) {
        return fetch(
            `${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        avatar: newURL,
                    }
                ),
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

    signup({email, password}) {
        return fetch(
            `${this._url}/signup`,
            {
                method: 'POST',
                headers: {'Content-type': 'application/json',},
                body: JSON.stringify({password, email}),
            })
            .then(this._getResponseData)
    }

    signin({email, password}) {
        return fetch(
            `${this._url}/signin`,
            {
                method: 'POST',
                headers: {'Content-type': 'application/json',},
                body: JSON.stringify({password, email})
            })
            .then(this._getResponseData)
    }

    getUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                    // ,
                    // "Authorization": `Bearer ${jwt}`
                },
                credentials: 'include',
            })
            .then(this._getResponseData)
    }

}

const api = new Api(
    'https://api.ivannizh.nomoredomains.work'
)

export default api
