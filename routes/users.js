const routerUser = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
  getMe,
} = require('../controllers/users');
const {
  getUserByIdData,
  updateAvatarData,
  updateUserData,
} = require('../middlewares/validatons');

routerUser.get('/', getUsers);
routerUser.get('/me', getMe);
routerUser.get('/:userId', getUserByIdData, getUserById);
routerUser.patch('/me', updateUserData, updateUser);
routerUser.patch('/me/avatar', updateAvatarData, updateAvatar);

module.exports = routerUser;
