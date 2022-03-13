// export class Auth {
//     constructor(urlAuth) {
//         this._urlAuth = urlAuth;
//     }
//
//     _getResponseData(res) {
//         if (!res.ok) {
//             return Promise.reject(`Error while fetching data: ${res.status}`);
//         }
//         return res.json();
//     }
//
//     signup({email, password}) {
//         return fetch(
//             `${this._urlAuth}/signup`,
//             {
//                 method: 'POST',
//                 headers: {'Content-type': 'application/json',},
//                 body: JSON.stringify({password, email})
//             })
//             .then(this._getResponseData)
//     }
//
//     signin({email, password}) {
//         return fetch(
//             `${this._urlAuth}/signin`,
//             {
//                 method: 'POST',
//                 headers: {'Content-type': 'application/json',},
//                 body: JSON.stringify({password, email})
//             })
//             .then(this._getResponseData)
//     }
//
//     getInfo() {
//         return fetch(
//             `${this._urlAuth}/users/me`,
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-type': 'application/json'
//                     // ,
//                     // "Authorization": `Bearer ${jwt}`
//                 }
//             })
//             .then(this._getResponseData)
//     }
// }
//
// const auth = new Auth('https://api.ivannizh.nomoredomains.work')
//
// export default auth
