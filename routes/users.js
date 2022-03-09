const routerUser = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
  getMe,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/me', getMe);
routerUser.get('/:userId', getUserById);
routerUser.patch('/me', updateUser);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
