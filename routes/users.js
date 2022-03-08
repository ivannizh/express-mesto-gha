const routerUser = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', getUserById);
routerUser.patch('/users/me', updateUser);
routerUser.patch('/users/me/avatar', updateAvatar);
routerUser.post('/signin', login);
routerUser.post('/signup', createUser);
module.exports = routerUser;
