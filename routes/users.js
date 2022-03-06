const routerUser = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', getUserById);
routerUser.post('/users', createUser);
routerUser.patch('/users/me', updateUser);
routerUser.patch('/users/me/avatar', updateAvatar);

module.exports = routerUser;
